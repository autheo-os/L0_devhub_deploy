import type { ReactNode } from "react";
import type { PageId } from "../rails";
import type { Theme } from "./ThemeToggle";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

interface PageShellProps {
  page: PageId;
  theme: Theme;
  onThemeToggle: () => void;
  children: ReactNode;
}

export function PageShell({ page, theme, onThemeToggle, children }: PageShellProps) {
  return (
    <div className="site-shell" id="top">
      <SiteHeader page={page} theme={theme} onThemeToggle={onThemeToggle} />
      <main>{children}</main>
      <SiteFooter />
    </div>
  );
}
