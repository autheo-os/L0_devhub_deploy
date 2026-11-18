import { ComingSoonPanel } from "@/components/coming-soon";

/** Game settings and modding are announced but not available yet; this page is static and calls no backend. */
export default function GameSettings() {
  return (
    <ComingSoonPanel
      title="Game settings & mods"
      description="Tune a game server from the dashboard instead of editing files by hand. This is not available yet; your server keeps running with the settings you chose when you created it."
      items={[
        "Mods and plugins synced from a folder in your Drive",
        "Game version and server type pins (for example a specific Minecraft version or Paper, Forge or Fabric)",
        "A world snapshot before every deploy, so you can roll a world back",
      ]}
    />
  );
}
