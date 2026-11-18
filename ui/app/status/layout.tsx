import { pageMeta } from "@/lib/page-meta";

export const metadata = pageMeta({
  title: "Status",
  socialTitle: "Status — autheo",
  description: "Incidents declared by autheo, as the incident feed reports them.",
  path: "/status",
});

export default function StatusLayout({ children }: { children: React.ReactNode }) {
  return children;
}
