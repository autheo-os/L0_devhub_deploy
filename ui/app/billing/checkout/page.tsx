"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Lock, Loader2, Wallet, CheckCircle2 } from "lucide-react";
import { Button, Input } from "@/components/ui";
import { RoleGate } from "@/components/role-gate";
import { apiGet, apiSend } from "@/lib/api";
import { sendTheoTransfer, switchNetwork, walletChainId, walletProviderNames, type TheoNetwork, type WalletProviderId } from "@/lib/theo-wallet";
import { useWallet } from "@/components/wallet-connection";
import { TheoUsdEstimate } from "@/components/theo-market-reference";

interface Checkout {
  id: string;
  tenant: string;
  kind: string;
  plan: string;
  /** USD settlement (Stripe / card): present on a node that prices in cents. */
  amount_cents?: number;
  /** THEO settlement (wallet-signed): present, with `network`, on a node that prices in THEO. */
  amount_theo_atomic?: string;
  network?: TheoNetwork;
  sku?: string;
  target?: string;
}

function usd(c: number) {
  return `$${(c / 100).toFixed(2)}`;
}

function theo(amount: string, decimals: number) {
  const v = BigInt(amount);
  const base = 10n ** BigInt(decimals);
  const whole = v / base;
  const fraction = (v % base).toString().padStart(decimals, "0").replace(/0+$/, "");
  return `${whole}${fraction ? `.${fraction.slice(0, 6)}` : ""} THEO`;
}

function theoDisplayValue(amount: string, decimals: number) {
  const base = 10n ** BigInt(decimals);
  const atomic = BigInt(amount);
  return Number(atomic / base) + Number(atomic % base) / Number(base);
}

function CheckoutInner() {
  const router = useRouter();
  const walletSession = useWallet();
  const session = useSearchParams().get("session") || "";
  const [co, setCo] = useState<Checkout | null>(null);
  const [paying, setPaying] = useState(false);
  const [err, setErr] = useState("");
  const [chain, setChain] = useState<number | null>(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (!session) return;
    apiGet<Checkout>(`/v1/billing/checkout/${encodeURIComponent(session)}`).then(setCo).catch(() => setErr("Checkout session not found."));
  }, [session]);

  useEffect(() => {
    if (!walletSession.providerId) return;
    walletChainId(walletSession.providerId).then(setChain).catch(() => setChain(null));
  }, [walletSession.providerId]);

  async function pay() {
    setPaying(true);
    setErr("");
    try {
      if (co?.amount_theo_atomic && co.network) {
        // THEO settlement: the server authors the intent, the wallet signs, the server verifies on-chain.
        if (!walletSession.address || !walletSession.providerId) {
          throw new Error("Choose and connect a wallet before continuing.");
        }
        // Refresh server-authored intent immediately before signing. Neither the
        // displayed checkout nor any browser-held value authorizes settlement.
        const intent = await apiSend<{ amount_theo_atomic: string; network: TheoNetwork }>("POST", `/v1/billing/checkout/${encodeURIComponent(session)}/payment-intent`, {});
        let connectedChain = await walletChainId(walletSession.providerId);
        if (connectedChain !== intent.network.chain_id) {
          setStatus("Switching to the Autheo network…");
          await switchNetwork(intent.network, walletSession.providerId);
          connectedChain = await walletChainId(walletSession.providerId);
        }
        setChain(connectedChain);
        if (connectedChain !== intent.network.chain_id) throw new Error("Connect your wallet to the configured Autheo network before paying.");
        setStatus("Review and approve the THEO transaction in your wallet…");
        const transaction_hash = await sendTheoTransfer(intent.network, walletSession.address, intent.amount_theo_atomic, walletSession.providerId);
        setStatus("Transaction submitted. Waiting for network confirmation…");
        await apiSend("POST", "/v1/billing/confirm", { session, wallet: walletSession.address, transaction_hash });
        setStatus("THEO settlement confirmed.");
      } else {
        await apiSend("POST", "/v1/billing/confirm", { session });
      }
      if (co?.kind === "addon" && co.target) {
        router.replace(`/projects/${encodeURIComponent(co.target)}/settings/network?addon_success=${encodeURIComponent(co.id)}`);
      } else {
        router.replace("/billing?success=1");
      }
    } catch (e) {
      const message = e instanceof Error ? e.message : String(e);
      setErr(/reject|denied|4001/i.test(message) ? "Transaction rejected in wallet. No payment was made." : message);
      setStatus("");
      setPaying(false);
    }
  }

  const isTheo = !!(co?.amount_theo_atomic && co.network);
  const title =
    co?.kind === "credits"
      ? "Add compute credits"
      : co?.kind === "addon"
        ? co.sku === "dedicated_ipv4"
          ? `Dedicated IPv4 — ${co.target}`
          : co.sku || "Add-on"
        : `${co?.plan ? co.plan[0].toUpperCase() + co.plan.slice(1) : ""} plan`;

  function cancel() {
    if (co?.kind === "addon" && co.target) {
      router.replace(`/projects/${encodeURIComponent(co.target)}/settings/network?addon_canceled=1`);
    } else {
      router.replace("/billing?canceled=1");
    }
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-bg px-4">
      <div className="w-full max-w-[420px] overflow-hidden rounded-2xl border border-border bg-card shadow-pop">
        <div className="border-b border-border px-6 py-4">
          <div className="flex items-center gap-2 text-sm text-muted">
            {isTheo ? <Wallet className="h-3.5 w-3.5" /> : <Lock className="h-3.5 w-3.5" />}
            {isTheo ? " Wallet-signed THEO settlement" : " Mock secure checkout · DevHub"}
          </div>
        </div>
        {err ? (
          <div className="px-6 py-8 text-center text-sm text-red-500">{err}</div>
        ) : !co ? (
          <div className="flex items-center justify-center px-6 py-12 text-muted"><Loader2 className="h-5 w-5 animate-spin" /></div>
        ) : (
          <div className="px-6 py-6">
            <div className="mb-1 text-sm text-secondary">{title}</div>
            {co.amount_theo_atomic && co.network ? (
              <>
                <div className="mb-2 text-3xl font-semibold tabular-nums">{theo(co.amount_theo_atomic, co.network.token_decimals)}</div>
                <div className="mb-2"><TheoUsdEstimate amountTheo={theoDisplayValue(co.amount_theo_atomic, co.network.token_decimals)} /></div>
                <p className="mb-5 text-xs text-muted">THEO is the only settlement currency. USD reference only — a display-only estimate never determines this amount.</p>
                <RoleGate action="billing.pay" note>
                  <div className="mb-5 rounded-lg border border-border bg-subtle/30 p-3 text-sm">
                    <div className="font-medium">{walletSession.address ? `Connected: ${walletSession.address.slice(0, 6)}…${walletSession.address.slice(-4)}` : "No wallet connected"}</div>
                    <div className="mt-1 text-xs text-secondary">
                      {chain === co.network.chain_id ? `Autheo network (${co.network.chain_id})` : `Switch to ${co.network.chain_name} (${co.network.chain_id}) before signing`}
                    </div>
                    <div className="mt-1 text-xs text-muted">Server verification requires {co.network.required_confirmations} network confirmation{co.network.required_confirmations === 1 ? "" : "s"}.</div>
                  </div>
                  {!walletSession.address ? (
                    <div className="grid gap-2 sm:grid-cols-3">
                      {(["metamask", "coinbase", "keplr"] as WalletProviderId[]).map((id) => (
                        <Button key={id} variant="outline" disabled={paying} onClick={() => walletSession.connect(id).catch((e: unknown) => setErr(e instanceof Error ? e.message : String(e)))} className="justify-center">
                          {walletProviderNames[id]}
                        </Button>
                      ))}
                    </div>
                  ) : (
                    <Button onClick={pay} disabled={paying} className="w-full justify-center bg-fg py-2.5 text-bg">
                      {paying ? <Loader2 className="h-4 w-4 animate-spin" /> : "Review THEO transaction"}
                    </Button>
                  )}
                </RoleGate>
              </>
            ) : (
              <>
            <div className="mb-6 text-3xl font-semibold tabular-nums">{usd(co.amount_cents ?? 0)}</div>

            <RoleGate action="billing.pay" note>
            <label className="mb-1.5 block text-xs font-medium text-secondary">Card number</label>
            <Input defaultValue="4242 4242 4242 4242" className="mb-3 font-mono" />
            <div className="mb-5 grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-secondary">Expiry</label>
                <Input defaultValue="12 / 34" className="font-mono" />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-secondary">CVC</label>
                <Input defaultValue="123" className="font-mono" />
              </div>
            </div>

            <Button onClick={pay} disabled={paying} className="w-full justify-center bg-fg py-2.5 text-bg">
              {paying ? <Loader2 className="h-4 w-4 animate-spin" /> : `Pay ${usd(co.amount_cents ?? 0)}`}
            </Button>
            </RoleGate>
              </>
            )}
            <button onClick={cancel} className="mt-3 w-full text-center text-xs text-muted hover:text-fg">
              Cancel
            </button>
            {isTheo ? (
              status && <p className="mt-4 flex items-center justify-center gap-1.5 text-center text-[11px] text-secondary"><CheckCircle2 className="h-3.5 w-3.5" />{status}</p>
            ) : (
              <p className="mt-4 text-center text-[11px] text-muted">
                Test mode — no real charge. Set <span className="font-mono">STRIPE_SECRET_KEY</span> for live checkout.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={null}>
      <CheckoutInner />
    </Suspense>
  );
}
