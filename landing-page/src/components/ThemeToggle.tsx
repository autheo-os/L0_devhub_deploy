import { Moon, Sun } from "lucide-react";

export type Theme = "day" | "night";

interface ThemeToggleProps {
  theme: Theme;
  onToggle: () => void;
}

export function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  return (
    <button
      className="theme-toggle"
      type="button"
      aria-label={`Switch to ${theme === "day" ? "night" : "day"} mode`}
      onClick={onToggle}
    >
      {theme === "day" ? <Moon aria-hidden="true" size={18} /> : <Sun aria-hidden="true" size={18} />}
    </button>
  );
}
