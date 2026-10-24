"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  // eslint-disable-next-line react-hooks/set-state-in-effect -- hydration-mismatch-avoidance mount flag: render neutral state until client mount, then reveal theme-dependent icon
  useEffect(() => setMounted(true), []);

  const dark = resolvedTheme === "dark";
  const label = mounted
    ? dark
      ? "Switch to day theme"
      : "Switch to night theme"
    : "Toggle theme";

  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={mounted ? dark : undefined}
      title={label}
      onClick={() => setTheme(dark ? "light" : "dark")}
      className="flex h-8 w-8 items-center justify-center rounded-md border border-border text-secondary transition-colors duration-[240ms] hover:bg-subtle hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
    >
      {/* Avoid hydration mismatch: render a neutral icon until mounted. */}
      {!mounted || !dark ? <Sun className="h-4 w-4" aria-hidden="true" /> : <Moon className="h-4 w-4" aria-hidden="true" />}
    </button>
  );
}
