import { ArrowUpRight } from "lucide-react";
import type { Rail } from "../rails";
import { StatusBadge } from "./StatusBadge";

export function RelatedRails({ rails }: { rails: Rail[] }) {
  return (
    <section className="detail-section related-section" aria-labelledby="related-title">
      <div className="detail-heading">
        <p className="eyebrow">Continue exploring</p>
        <h2 id="related-title">Related DevHub rails</h2>
      </div>
      <div className="related-grid">
        {rails.map(({ icon: Icon, ...rail }) => (
          <a href={rail.href} className="related-card" key={rail.id}>
            <div><Icon aria-hidden="true" size={22} /><StatusBadge status={rail.status} /></div>
            <h3>{rail.label}</h3>
            <p>{rail.summary}</p>
            <span>Explore this rail <ArrowUpRight aria-hidden="true" size={15} /></span>
          </a>
        ))}
      </div>
    </section>
  );
}
