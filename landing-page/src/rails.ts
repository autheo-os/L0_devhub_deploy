import {
  Bot,
  Cloud,
  FolderKanban,
  Home,
  Rocket,
  Store,
  type LucideIcon,
} from "lucide-react";

export type PageId =
  | "home"
  | "build-deploy"
  | "manage-monitor"
  | "cloud-computing"
  | "ai-assisted"
  | "getting-started"
  | "marketplace";

export type RailStatus = "Available" | "Available workflow" | "In development" | "Coming soon";

export interface Rail {
  id: PageId;
  label: string;
  shortLabel: string;
  href: string;
  status: RailStatus;
  eyebrow: string;
  summary: string;
  icon: LucideIcon;
  primary: boolean;
}

export const rails: Rail[] = [
  {
    id: "home",
    label: "Home",
    shortLabel: "DevHub overview",
    href: "/",
    status: "Available",
    eyebrow: "Autheo DevHub",
    summary: "An overview of the tools and workflows available across DevHub.",
    icon: Home,
    primary: true,
  },
  {
    id: "build-deploy",
    label: "Build & Deploy",
    shortLabel: "Build & Deploy",
    href: "/build-deploy/",
    status: "Available",
    eyebrow: "From source to a running workload",
    summary: "Prepare supported source or an image, configure it, and create a deployment.",
    icon: Rocket,
    primary: true,
  },
  {
    id: "manage-monitor",
    label: "Manage & Monitor",
    shortLabel: "Manage & Monitor",
    href: "/manage-monitor/",
    status: "Available",
    eyebrow: "Keep projects understandable",
    summary: "Review deployments, build activity, logs, settings, and workload information.",
    icon: FolderKanban,
    primary: true,
  },
  {
    id: "cloud-computing",
    label: "Cloud Computing",
    shortLabel: "Cloud Computing",
    href: "/cloud-computing/",
    status: "Available",
    eyebrow: "A practical cloud starting point",
    summary: "Learn how DevHub connects supported projects to available Autheo infrastructure.",
    icon: Cloud,
    primary: true,
  },
  {
    id: "marketplace",
    label: "Marketplace",
    shortLabel: "Marketplace",
    href: "/marketplace/",
    status: "Coming soon",
    eyebrow: "Neighborhood Marketplace",
    summary: "Explore the concept for connecting customers with verified compute providers.",
    icon: Store,
    primary: true,
  },
  {
    id: "ai-assisted",
    label: "AI-Assisted Workflow",
    shortLabel: "AI-Assisted",
    href: "/ai-assisted/",
    status: "Available workflow",
    eyebrow: "External assistant, DevHub deployment",
    summary: "Use a preferred AI coding tool, review its output, then deploy the resulting project.",
    icon: Bot,
    primary: false,
  },
  {
    id: "getting-started",
    label: "Getting Started",
    shortLabel: "Getting Started",
    href: "/getting-started/",
    status: "Available",
    eyebrow: "A first deployment guide",
    summary: "Prepare a small project, configure its requirements, deploy it, and inspect the result.",
    icon: Rocket,
    primary: false,
  },
];

export const railById = Object.fromEntries(rails.map((rail) => [rail.id, rail])) as Record<PageId, Rail>;

export function relatedRails(ids: PageId[]) {
  return ids.map((id) => railById[id]);
}
