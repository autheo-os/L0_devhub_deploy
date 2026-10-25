import { Gamepad2, HardDrive, ShieldCheck, Store, UsersRound } from "lucide-react";
import marketplaceOverview from "../assets/marketplace-overview.png";
import marketplaceFlow from "../assets/marketplace-flow.png";
import { ClosingCta } from "../components/ClosingCta";
import { DetailCards, TwoColumnInfo } from "../components/DetailBlocks";
import { RailHero } from "../components/RailHero";
import { RelatedRails } from "../components/RelatedRails";
import { StatusBadge } from "../components/StatusBadge";
import { WorkflowSteps } from "../components/WorkflowSteps";
import { railById, relatedRails } from "../rails";

export function MarketplacePage() {
  const rail = railById.marketplace;
  return (
    <>
      <RailHero
        status={rail.status}
        eyebrow={rail.eyebrow}
        title="A future neighborhood for shared compute."
        intro="The Neighborhood Marketplace is a concept for connecting customers who need computing resources with verified providers who have eligible capacity to contribute. The marketplace experience described here is not currently available."
        secondaryHref="/cloud-computing/"
        secondaryLabel="Explore today's cloud rail"
        launch={false}
      >
        <div className="rail-callout marketplace-callout">
          <Store aria-hidden="true" size={34} />
          <StatusBadge status="Concept only" />
          <p>Purchasing, provider registration, staking, earnings, and payments are not currently available.</p>
        </div>
      </RailHero>

      <section className="detail-section marketplace-deep-art" aria-labelledby="marketplace-vision-title">
        <div className="detail-heading">
          <p className="eyebrow">Concept overview</p>
          <h2 id="marketplace-vision-title">People, projects, and eligible capacity</h2>
          <p>The envisioned experience brings resource discovery and provider participation into a clearly labeled future marketplace.</p>
        </div>
        <figure>
          <span className="art-stamp">Coming soon</span>
          <img src={marketplaceOverview} alt="Concept illustration of gamers, business owners, creators, and developers connecting to a future neighborhood compute marketplace." />
          <figcaption>Concept only - this artwork illustrates a planned direction, not a currently purchasable service.</figcaption>
        </figure>
      </section>

      <DetailCards eyebrow="What the concept is designed to support" title="A two-sided compute neighborhood" items={[
        { title: "Find computing resources", copy: "Customers could discover eligible capacity suited to supported project and workload needs." },
        { title: "Host supported game servers", copy: "The concept includes supported game-server workloads where compatibility and capacity allow." },
        { title: "Connect with verified providers", copy: "Provider participation is envisioned to follow identity, eligibility, security, and operational checks." },
        { title: "Use a THEO-powered marketplace", copy: "The planned flow places THEO within a future compute-marketplace experience; no payment or staking feature is available today." },
        { title: "Contribute eligible capacity", copy: "Providers could eventually offer qualifying resources after completing the planned verification process." },
        { title: "Follow a clear resource flow", copy: "The concept connects customer demand, selected resources, verified providers, and workload execution." },
      ]} />

      <section className="detail-section marketplace-flow-section" aria-labelledby="marketplace-flow-title">
        <div className="detail-heading">
          <StatusBadge status="Concept only" />
          <p className="eyebrow">Customer / resource / provider flow</p>
          <h2 id="marketplace-flow-title">Verification before participation</h2>
          <p>The envisioned path includes provider application, checks, resource selection, ordering, and workload execution. Each step remains conceptual.</p>
        </div>
        <figure>
          <img src={marketplaceFlow} alt="Concept flow showing provider application and verification, resource selection, customer ordering, and DevHub workload execution." />
          <figcaption>Planned flow; provider onboarding and marketplace transactions are not open.</figcaption>
        </figure>
      </section>

      <WorkflowSteps title="How the future flow is envisioned" steps={[
        { title: "Provider applies", copy: "A prospective provider would submit information about identity and eligible capacity." },
        { title: "Provider is verified", copy: "Planned security, eligibility, and operational checks would take place before participation." },
        { title: "Resources become discoverable", copy: "Approved compatible capacity could be represented for customers to consider." },
        { title: "Customer selects a resource", copy: "A customer could choose from supported capacity appropriate to a workload." },
        { title: "Workload moves through DevHub", copy: "The selected resource and supported workload would connect to a DevHub execution flow." },
      ]} />

      <TwoColumnInfo
        eyebrow="Status and limitations"
        title="Future language is intentional"
        firstTitle="Concept themes"
        first={<ul><li><HardDrive aria-hidden="true" size={15} /> Compute-resource discovery</li><li><Gamepad2 aria-hidden="true" size={15} /> Supported game-server hosting</li><li><UsersRound aria-hidden="true" size={15} /> Provider participation</li><li><ShieldCheck aria-hidden="true" size={15} /> Verification before access</li></ul>}
        secondTitle="Not currently available"
        second={<ul><li>Purchasing</li><li>Provider registration</li><li>Staking or earnings</li><li>Marketplace payments</li></ul>}
      />
      <RelatedRails rails={relatedRails(["cloud-computing", "build-deploy", "manage-monitor"])} />
      <ClosingCta eyebrow="Available today" title="Build with DevHub while the Marketplace takes shape." copy="Explore the current deployment rails without treating future marketplace capacity as available." href="/build-deploy/" label="Explore Build & Deploy" />
    </>
  );
}
