import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // shadw.cloud serves the ZIP from the domain root.
  base: "/",
  plugins: [react()],
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
});
