"use client";

import Image from "next/image";
import { ArrowRight, Boxes, Database, Network } from "lucide-react";
import { marketplaceUrl } from "@/lib/marketplace";

/** The Autheo Marketplace band: compute, storage and domains offered alongside the apps a project deploys. It links to the Marketplace itself
 *  (an external site, `marketplaceUrl()`), never to a route of this dashboard. */
export function MarketplaceBand() {
  return (
    <section className="relative overflow-hidden px-6 py-24 sm:py-32" aria-labelledby="lp-marketplace-title">
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.12] mix-blend-screen">
        <Image src="/images/developer-workshop-streetscape.png" alt="" fill sizes="100vw" className="object-cover object-center" />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-80 w-[min(58rem,100vw)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/15"
        style={{ background: "radial-gradient(closest-side, rgba(16,185,129,0.22), transparent)" }}
      />
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl border border-emerald-300/20 bg-[#07130d]/85 p-7 shadow-[0_30px_100px_-40px_rgba(74,222,128,0.45)] sm:p-12">
        <div className="absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-emerald-300/70 to-transparent" />
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-300">Autheo Marketplace</p>
            <h2 id="lp-marketplace-title" className="mt-4 text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Everything your app needs, in one marketplace.
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-zinc-300">
              Provision compute, storage, databases, domains, and more directly alongside the applications you build on Autheo.
            </p>
            <a
              href={marketplaceUrl()}
              target="_blank"
              rel="noreferrer"
              className="group mt-8 inline-flex min-h-[44px] items-center gap-2 rounded-full bg-emerald-300 px-6 py-3 text-sm font-semibold text-emerald-950 shadow-lg shadow-emerald-400/20 transition-transform hover:scale-[1.03] hover:bg-emerald-200"
            >
              Explore Marketplace
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>
          <div className="grid gap-3">
            <Capability icon={<Boxes className="h-5 w-5" />} title="Compute" description="Functions, containers, and edge workloads ready to provision." />
            <Capability icon={<Database className="h-5 w-5" />} title="Storage and databases" description="Durable storage and managed data services for every app." />
            <Capability icon={<Network className="h-5 w-5" />} title="Domains and networking" description="Connect your app with domains, networking, and app services." />
          </div>
        </div>
      </div>
    </section>
  );
}

function Capability({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.045] p-5 transition-colors hover:border-emerald-300/30 hover:bg-emerald-300/[0.07]">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-emerald-300/25 bg-emerald-300/10 text-emerald-200">{icon}</div>
      <div>
        <h3 className="font-semibold text-white">{title}</h3>
        <p className="mt-1 text-sm leading-relaxed text-zinc-400">{description}</p>
      </div>
    </div>
  );
}
