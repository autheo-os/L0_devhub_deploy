import { ArrowUpRight, Gamepad2, HardDrive, Store, UsersRound } from "lucide-react";
import marketplaceOverview from "../assets/marketplace-overview.png";

const previewItems = [
  { icon: HardDrive, text: "Find computing resources for your projects." },
  { icon: Gamepad2, text: "Host supported game servers." },
  { icon: UsersRound, text: "Connect with verified compute providers." },
  { icon: Store, text: "Participate in a THEO-powered compute marketplace." },
];

export function MarketplacePreview() {
  return (
    <section id="marketplace" className="marketplace section" aria-labelledby="marketplace-title">
      <div className="section-heading marketplace-heading">
        <span className="status status-coming">Coming soon</span>
        <p className="eyebrow">Neighborhood Marketplace</p>
        <h2 id="marketplace-title">Coming Soon: The Neighborhood Marketplace</h2>
        <p>
          A community-powered marketplace connecting people who need computing resources with
          providers who have capacity to share.
        </p>
      </div>

      <div className="marketplace-stage">
        <div className="marketplace-copy">
          <div className="future-card">
            <span className="future-card-label">Future experience</span>
            <h3>A neighborhood built around shared capacity</h3>
            <div className="future-list">
              {previewItems.map(({ icon: Icon, text }) => (
                <div className="future-item" key={text}>
                  <span className="future-icon"><Icon aria-hidden="true" size={20} /></span>
                  <span>{text}</span>
                </div>
              ))}
              <div className="future-item">
                <span className="future-icon"><UsersRound aria-hidden="true" size={20} /></span>
                <span>Contribute eligible computing capacity.</span>
              </div>
            </div>
            <p className="availability-note">
              Preview only. Purchasing, provider registration, staking, earnings, and payments
              are not available.
            </p>
            <a className="button button-dark" href="/marketplace/">
              Explore the Marketplace Vision <ArrowUpRight aria-hidden="true" size={17} />
            </a>
          </div>
        </div>

        <div className="marketplace-art">
          <span className="art-stamp">Coming soon</span>
          <img
            src={marketplaceOverview}
            alt="Illustrated preview showing how gamers, business owners, creators, and developers may benefit from a future neighborhood compute marketplace."
          />
        </div>
      </div>

    </section>
  );
}
