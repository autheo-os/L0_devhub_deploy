import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";

export default defineConfig({
  // shadw.cloud serves the ZIP from the domain root.
  base: "/",
  plugins: [react()],
  build: {
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        home: resolve(import.meta.dirname, "index.html"),
        buildDeploy: resolve(import.meta.dirname, "build-deploy/index.html"),
        manageMonitor: resolve(import.meta.dirname, "manage-monitor/index.html"),
        cloudComputing: resolve(import.meta.dirname, "cloud-computing/index.html"),
        aiAssisted: resolve(import.meta.dirname, "ai-assisted/index.html"),
        gettingStarted: resolve(import.meta.dirname, "getting-started/index.html"),
        marketplace: resolve(import.meta.dirname, "marketplace/index.html"),
      },
    },
  },
});
