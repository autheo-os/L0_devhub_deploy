import { Suspense } from "react";
import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Space_Grotesk, Electrolize } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { clerkFrontendOrigin } from "@/lib/clerk-origin.mjs";
import "./globals.css";
import { ChromeTop, ChromeBottom } from "@/components/app-chrome";
import { ThemeProvider } from "@/components/theme-provider";
import { PwaRegister } from "@/components/pwa-register";
import { Toaster } from "@/components/toast";
import { GithubConnectError } from "@/components/github-connect-error";
import { LoginOtpChallenge } from "@/components/login-otp-challenge";
import { VitalsBeacon } from "@/components/vitals-beacon";
import { WalletProvider } from "@/components/wallet-connection";

export const instant = false;

// schema.org JSON-LD so AI search / LLMs (and rich results) can parse what Autheo DevHub is; rendered once in the root so every page carries it.
const STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://autheo.dev/#org",
      name: "Autheo",
      url: "https://autheo.dev",
      description:
        "Autheo DevHub is a cloud for serverless functions, containers and static sites deployed from Git, with managed databases.",
    },
    {
      "@type": "WebSite",
      "@id": "https://autheo.dev/#site",
      url: "https://autheo.dev",
      name: "Autheo DevHub",
      publisher: { "@id": "https://autheo.dev/#org" },
    },
    {
      "@type": "SoftwareApplication",
      name: "Autheo DevHub",
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Web",
      offers: { "@type": "AggregateOffer", lowPrice: "0", priceCurrency: "USD" },
      description:
        "Deploy serverless functions, containers, and static sites from Git, with rollback to earlier deployments, a preview for every pull request on a connected GitHub repository, GitOps, and managed databases.",
    },
  ],
};

const display = Space_Grotesk({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const electrolize = Electrolize({ subsets: ["latin"], weight: "400", variable: "--font-electrolize", display: "swap" });

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://autheo.dev").replace(/\/$/, "");
const DESCRIPTION =
  "Autheo DevHub: push to Git, get a live URL: serverless functions, containers and static sites, plus managed databases, with a preview per GitHub pull request. Free to start.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Autheo DevHub — Electric Cloud Platform",
    // Public pages set their own titles; this templates them for consistent SEO.
    template: "%s · Autheo DevHub",
  },
  description: DESCRIPTION,
  applicationName: "Autheo DevHub",
  manifest: "/manifest.webmanifest",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Autheo DevHub",
    url: SITE_URL,
    title: "Autheo DevHub — Electric Cloud Platform",
    description: DESCRIPTION,
  },
  twitter: { card: "summary_large_image", title: "Autheo DevHub", description: DESCRIPTION },
  appleWebApp: {
    capable: true,
    title: "Autheo DevHub",
    statusBarStyle: "black-translucent",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#050b07" },
    { media: "(prefers-color-scheme: light)", color: "#f4fff6" },
  ],
};

const clerkEnabled = !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
const clerkOrigin = clerkFrontendOrigin(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);

const allowedRedirectOrigins = (
  process.env.NEXT_PUBLIC_ALLOWED_ORIGINS ||
  "http://localhost:3000,http://localhost:3001,http://localhost:3002,https://autheo.dev,https://www.autheo.dev"
)
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const tree = (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable} ${display.variable} ${electrolize.variable}`}
    >
      <head>
        {clerkEnabled && clerkOrigin ? (
          <link rel="preconnect" href={clerkOrigin} crossOrigin="anonymous" />
        ) : null}
      </head>
      <body className="flex min-h-screen flex-col bg-bg font-sans text-fg antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA) }} />
        <PwaRegister />
        <VitalsBeacon />
        <Toaster />
        <LoginOtpChallenge />
        <ThemeProvider>
          <WalletProvider>
            <Suspense fallback={null}>
              <ChromeTop />
            </Suspense>
            <main className="mx-auto w-full max-w-[1400px] flex-1 px-4 py-8 sm:px-6">
              <GithubConnectError />
              {children}
            </main>
            <Suspense fallback={null}>
              <ChromeBottom />
            </Suspense>
          </WalletProvider>
        </ThemeProvider>
      </body>
    </html>
  );
  return clerkEnabled ? (
    <ClerkProvider allowedRedirectOrigins={allowedRedirectOrigins}>{tree}</ClerkProvider>
  ) : (
    tree
  );
}
