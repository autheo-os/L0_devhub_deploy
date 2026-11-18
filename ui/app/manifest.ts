import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Autheo DevHub",
    short_name: "DevHub",
    description:
      "Autheo DevHub: deploy serverless functions, containers and static sites from Git, with a preview for every pull request on a connected GitHub repository.",
    id: "/",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "any",
    background_color: "#050b07",
    theme_color: "#0f8a3b",
    categories: ["developer", "productivity", "utilities"],
    icons: [
      { src: "/web-app-manifest-192x192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/web-app-manifest-512x512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/web-app-manifest-192x192.png", sizes: "192x192", type: "image/png", purpose: "maskable" },
      { src: "/web-app-manifest-512x512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
    shortcuts: [
      {
        name: "New project",
        short_name: "New project",
        description: "Import a Git repository and deploy it.",
        url: "/new",
        icons: [{ src: "/web-app-manifest-192x192.png", sizes: "192x192", type: "image/png" }],
      },
      {
        name: "New project",
        short_name: "New project",
        description: "Import a Git repository and deploy it.",
        url: "/new",
        icons: [{ src: "/web-app-manifest-192x192.png", sizes: "192x192", type: "image/png" }],
      },
    ],
  };
}
