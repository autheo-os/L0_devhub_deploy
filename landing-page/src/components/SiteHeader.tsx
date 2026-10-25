import { useEffect, useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { siteConfig } from "../config";
import { railById, rails, type PageId } from "../rails";
import { ThemeToggle, type Theme } from "./ThemeToggle";

interface SiteHeaderProps {
  page: PageId;
  theme: Theme;
  onThemeToggle: () => void;
}

export function SiteHeader({ page, theme, onThemeToggle }: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const primary = rails.filter((rail) => rail.primary);
  const secondary = rails.filter((rail) => !rail.primary);

  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);

  return (
    <header className="site-header">
      <a className="brand" href="/" aria-label="Autheo DevHub home">
        <span className="brand-mark">A</span>
        <span>autheo</span>
        <small>DevHub</small>
      </a>

      <nav id="site-navigation" className={`site-nav ${menuOpen ? "is-open" : ""}`} aria-label="Primary navigation">
        <div className="nav-primary">
          {primary.map((item) => (
            <a
              href={item.href}
              key={item.id}
              aria-current={page === item.id ? "page" : undefined}
              onClick={() => setMenuOpen(false)}
            >
              <span>{item.label}</span>
              {item.status === "Coming soon" && <small>Coming Soon</small>}
            </a>
          ))}
        </div>
        <div className="nav-secondary" aria-label="Guides">
          {secondary.map((item) => (
            <a
              href={item.href}
              key={item.id}
              aria-current={page === item.id ? "page" : undefined}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>

      <div className="header-actions">
        <ThemeToggle theme={theme} onToggle={onThemeToggle} />
        <a className="button button-primary header-cta" href={siteConfig.devHubUrl}>
          Launch DevHub <ArrowRight aria-hidden="true" size={16} />
        </a>
        <button
          className="menu-button"
          type="button"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          aria-controls="site-navigation"
          onClick={() => setMenuOpen((value) => !value)}
        >
          {menuOpen ? <X aria-hidden="true" size={21} /> : <Menu aria-hidden="true" size={21} />}
        </button>
      </div>
      <span className="sr-only">Current page: {railById[page].label}</span>
    </header>
  );
}
