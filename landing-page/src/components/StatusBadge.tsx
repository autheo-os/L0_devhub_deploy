import type { RailStatus } from "../rails";

export function StatusBadge({ status }: { status: RailStatus | "Concept only" | "Beginner friendly" }) {
  const className =
    status === "Coming soon" || status === "Concept only"
      ? "status-coming"
      : status === "In development"
        ? "status-development"
        : "status-available";
  return <span className={`status ${className}`}>{status}</span>;
}
