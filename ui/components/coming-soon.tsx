import type { ReactNode } from "react";

/** A small "Coming soon" tag for features that are announced but not available yet. Static markup only: it never calls the backend. */
export function ComingSoonBadge({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border border-border-strong px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-secondary ${className}`}
    >
      Coming soon
    </span>
  );
}

/** A full-width "coming soon" panel for a settings area. */
export function ComingSoonPanel({ title, description, items }: { title: string; description: ReactNode; items?: string[] }) {
  return (
    <section aria-labelledby="coming-soon-title" className="rounded-lg border border-dashed border-border-strong p-6">
      <div className="flex flex-wrap items-center gap-3">
        <h2 id="coming-soon-title" className="text-lg font-semibold">
          {title}
        </h2>
        <ComingSoonBadge />
      </div>
      <p className="mt-3 max-w-2xl text-sm text-secondary">{description}</p>
      {items?.length ? (
        <ul className="mt-4 list-disc space-y-1.5 pl-5 text-sm text-secondary">
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}
