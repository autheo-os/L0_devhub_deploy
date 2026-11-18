import type { ReactNode } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { siteConfig } from "../config";
import type { RailStatus } from "../rails";
import { StatusBadge } from "./StatusBadge";

interface RailHeroProps {
  status: RailStatus;
  eyebrow: string;
  title: string;
  intro: string;
  secondaryHref: string;
  secondaryLabel: string;
  children?: ReactNode;
  launch?: boolean;
}

export function RailHero({
  status,
  eyebrow,
  title,
  intro,
  secondaryHref,
  secondaryLabel,
  children,
  launch = true,
}: RailHeroProps) {
  return (
    <section className="rail-hero" aria-labelledby="rail-title">
      <div className="rail-hero-copy">
        <a className="back-link" href="/"><ArrowLeft aria-hidden="true" size={15} /> Back to DevHub overview</a>
        <StatusBadge status={status} />
        <p className="eyebrow">{eyebrow}</p>
        <h1 id="rail-title">{title}</h1>
        <p className="rail-intro">{intro}</p>
        <div className="hero-actions">
          {launch && (
            <a className="button button-primary" href={siteConfig.devHubUrl}>
              Open DevHub <ArrowRight aria-hidden="true" size={17} />
            </a>
          )}
          <a className="button button-secondary" href={secondaryHref}>{secondaryLabel}</a>
        </div>
      </div>
      {children && <div className="rail-hero-panel">{children}</div>}
    </section>
  );
}
