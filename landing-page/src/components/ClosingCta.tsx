import { Activity, ArrowRight } from "lucide-react";
import { siteConfig } from "../config";

interface ClosingCtaProps {
  eyebrow?: string;
  title: string;
  copy: string;
  href?: string;
  label?: string;
}

export function ClosingCta({
  eyebrow = "Ready for the next step?",
  title,
  copy,
  href = siteConfig.devHubUrl,
  label = "Launch DevHub",
}: ClosingCtaProps) {
  return (
    <section className="closing">
      <div>
        <span className="closing-icon"><Activity aria-hidden="true" size={22} /></span>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        <p>{copy}</p>
      </div>
      <a className="button button-light" href={href}>
        {label} <ArrowRight aria-hidden="true" size={17} />
      </a>
    </section>
  );
}
