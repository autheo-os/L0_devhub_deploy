"use client";

import { useEffect, useState } from "react";
import { AnimatedGlobe } from "@/components/globe";

/* The dashboard's opening splash (Autheo DevHub): the animated network globe behind the brand mark, once per page load. The signed-out
   landing has its own intro (`components/landing/intro-loader.tsx`); this one is the authenticated dashboard's, kept in its own module so
   the dashboard chunk does not pull the landing in. */

// Whether the intro already played during THIS page load. Module scope — reset
// only by a real navigation/reload, never by a React remount. The landing↔
// dashboard flip is decided by CLIENT auth state (see home-client.tsx), so
// <Landing> can unmount and REMOUNT within a single page load — and does so
// repeatedly when Clerk's auth state cannot settle (the mobile split-brain
// cookie state). Replaying a 2.75s full-screen black overlay plus a
// documentElement scroll-lock on every remount amplified that thrash into the
// reported "flickers endlessly"; this flag makes the intro strictly
// once-per-page-load. The server never sets it (only the client effect does),
// so SSR always renders the overlay and hydration stays consistent.
let introPlayed = false;

/** Intro loading animation (reference video 1): a full-screen dark overlay with
 *  the autheo ghost logo centered inside the rotating GlowRing. ~2s of spin, then
 *  the overlay fades to reveal the hero. Plays once per PAGE LOAD (a client-side
 *  remount of <Landing> — e.g. an auth-state flip — must NOT replay it); skipped
 *  entirely for prefers-reduced-motion. Rendered from first paint (SSR) so
 *  there's no pre-hydration flash of the hero. All layout is inline styles —
 *  deterministic, no class-generation dependency. */
export function OpeningSplash() {
  // On a remount after the intro already ran this page load, start (and stay)
  // done — no overlay frame at all. On the hydration mount `introPlayed` is
  // still false on both server and client, so SSR and the first client render
  // agree on "show".
  const [phase, setPhase] = useState<"show" | "fade" | "done">(() => (introPlayed ? "done" : "show"));
  useEffect(() => {
    if (introPlayed) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- re-syncs against the module-level `introPlayed` flag, which can flip between this render and effect commit on a fast remount; the lazy initializer alone can't observe that
      setPhase("done"); // no-op when the initializer already started at "done"
      return;
    }
    introPlayed = true;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setPhase("done");
      return;
    }
    // Lock scrolling while the intro plays so the viewport-anchored overlay
    // can't be scrolled away mid-animation.
    document.documentElement.style.overflow = "hidden";
    const t1 = setTimeout(() => setPhase("fade"), 2000); // ring + logo hold (~2s like the video)
    const t2 = setTimeout(() => setPhase("done"), 2750); // overlay gone
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      document.documentElement.style.overflow = "";
    };
  }, []);
  useEffect(() => {
    if (phase === "done") document.documentElement.style.overflow = "";
  }, [phase]);
  if (phase === "done") return null;
  // The loading surface previews the current dashboard visual rather than the
  // retired wordmark-only ring. Keep it intentionally larger than the empty
  // state globe so a refresh has a clear, full-screen transition.
  // Square container plus the globe SVG's square viewBox preserves the circle
  // at every viewport size; it is intentionally much larger than the Projects
  // empty-state version so Refresh reads as a branded hero.
  // Keep the transition dramatic while letting the wordmark and atmospheric
  // glow breathe. This is 11% smaller than the prior 56rem / 104vw frame.
  const size = "min(50rem, 92vw)";
  return (
    // NOTE: `position:fixed` is a TRAP here — MarketingShell's page wrapper is
    // CSS-transformed (`-translate-x-1/2`), which turns any fixed descendant
    // into an absolute one against the PAGE-TALL wrapper: the overlay then spans
    // the whole document and its centered children land thousands of px below
    // the fold (the "just a black screen" bug). Anchor to the FIRST VIEWPORT
    // instead (absolute + 100vh, page always loads at scroll-top) and center
    // with flex.
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: "100vh",
        zIndex: 100,
        background: "#01060b",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: phase === "fade" ? 0 : 1,
        transition: "opacity 700ms ease",
        pointerEvents: phase === "fade" ? "none" : "auto",
      }}
    >
      <div
        style={{
          position: "relative",
          width: size,
          height: size,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            zIndex: 0,
            left: "50%",
            top: "50%",
            width: "154%",
            transform: "translate(-50%, -55%)",
            color: "#35dcff",
            // Deliberately exceeds the sphere's silhouette at desktop widths:
            // the mark is a background hero layer, not a caption.
            fontSize: "clamp(5.25rem, 20vw, 18rem)",
            fontWeight: 650,
            letterSpacing: "0.16em",
            lineHeight: 0.8,
            opacity: 0.18,
            textAlign: "center",
            textTransform: "uppercase",
            whiteSpace: "nowrap",
            userSelect: "none",
          }}
        >
          Autheo
        </span>
        <AnimatedGlobe variant="hero" className="relative z-10 h-full w-full" />
        <span
          style={{
            position: "absolute",
            zIndex: 1,
            bottom: "8%",
            fontSize: "clamp(0.875rem, 1.6vw, 1.15rem)",
            lineHeight: 1,
            letterSpacing: "0.12em",
            fontWeight: 600,
            textTransform: "uppercase",
            color: "#9cf4ff",
          }}
        >
          Loading your cloud
        </span>
      </div>
    </div>
  );
}
