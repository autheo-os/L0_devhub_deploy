import type { ReactNode } from "react";
import { Check, Info } from "lucide-react";

export interface DetailItem {
  title: string;
  copy: string;
}

export function DetailCards({
  eyebrow,
  title,
  intro,
  items,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  items: DetailItem[];
}) {
  return (
    <section className="detail-section" aria-labelledby={`${title.replaceAll(" ", "-").toLowerCase()}-title`}>
      <div className="detail-heading">
        <p className="eyebrow">{eyebrow}</p>
        <h2 id={`${title.replaceAll(" ", "-").toLowerCase()}-title`}>{title}</h2>
        {intro && <p>{intro}</p>}
      </div>
      <div className="detail-card-grid">
        {items.map((item) => (
          <article key={item.title}>
            <Check aria-hidden="true" size={18} />
            <h3>{item.title}</h3>
            <p>{item.copy}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function TwoColumnInfo({
  eyebrow,
  title,
  firstTitle,
  first,
  secondTitle,
  second,
}: {
  eyebrow: string;
  title: string;
  firstTitle: string;
  first: ReactNode;
  secondTitle: string;
  second: ReactNode;
}) {
  return (
    <section className="detail-section info-section" aria-labelledby={`${title.replaceAll(" ", "-").toLowerCase()}-title`}>
      <div className="detail-heading">
        <p className="eyebrow">{eyebrow}</p>
        <h2 id={`${title.replaceAll(" ", "-").toLowerCase()}-title`}>{title}</h2>
      </div>
      <div className="info-grid">
        <article><Info aria-hidden="true" size={20} /><h3>{firstTitle}</h3>{first}</article>
        <article><Info aria-hidden="true" size={20} /><h3>{secondTitle}</h3>{second}</article>
      </div>
    </section>
  );
}
