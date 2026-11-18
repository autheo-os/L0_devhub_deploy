import { useEffect, useState } from "react";
import { PageShell } from "./components/PageShell";
import type { Theme } from "./components/ThemeToggle";
import { AiAssistedPage } from "./pages/AiAssistedPage";
import { BuildDeployPage } from "./pages/BuildDeployPage";
import { CloudComputingPage } from "./pages/CloudComputingPage";
import { GettingStartedPage } from "./pages/GettingStartedPage";
import { HomePage } from "./pages/HomePage";
import { ManageMonitorPage } from "./pages/ManageMonitorPage";
import { MarketplacePage } from "./pages/MarketplacePage";
import type { PageId } from "./rails";

const pages: Record<PageId, () => React.JSX.Element> = {
  home: HomePage,
  "build-deploy": BuildDeployPage,
  "manage-monitor": ManageMonitorPage,
  "cloud-computing": CloudComputingPage,
  "ai-assisted": AiAssistedPage,
  "getting-started": GettingStartedPage,
  marketplace: MarketplacePage,
};

export function App({ page }: { page: PageId }) {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem("autheo-landing-theme");
    if (saved === "day" || saved === "night") return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "night" : "day";
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("autheo-landing-theme", theme);
  }, [theme]);

  const Page = pages[page];
  return (
    <PageShell page={page} theme={theme} onThemeToggle={() => setTheme((value) => (value === "day" ? "night" : "day"))}>
      <Page />
    </PageShell>
  );
}
