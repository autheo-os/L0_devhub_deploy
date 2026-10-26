import { Boxes, Cloud, Globe2, Server } from "lucide-react";
import { ClosingCta } from "../components/ClosingCta";
import { DetailCards, TwoColumnInfo } from "../components/DetailBlocks";
import { RailHero } from "../components/RailHero";
import { RelatedRails } from "../components/RelatedRails";
import { WorkflowSteps } from "../components/WorkflowSteps";
import { railById, relatedRails } from "../rails";

export function CloudComputingPage() {
  const rail = railById["cloud-computing"];
  return (
    <>
      <RailHero
        status={rail.status}
        eyebrow={rail.eyebrow}
        title="Cloud computing, explained through a real project."
        intro="DevHub is an entry point to Autheo's cloud ecosystem. It takes a supported project from source or image to available compatible infrastructure, while exposing the project and deployment information you need to follow along."
        secondaryHref="/getting-started/"
        secondaryLabel="Start with a small project"
      >
        <div className="rail-icon-grid">
          <span><Globe2 aria-hidden="true" /><small>Regions</small></span>
          <span><Server aria-hidden="true" /><small>Resources</small></span>
          <span><Boxes aria-hidden="true" /><small>Workloads</small></span>
          <span><Cloud aria-hidden="true" /><small>Infrastructure</small></span>
        </div>
      </RailHero>
      <DetailCards eyebrow="What this rail helps you understand" title="The pieces behind a deployment" items={[
        { title: "Regions", copy: "Infrastructure is organized across locations. Which regions can accept a workload depends on current support and availability." },
        { title: "Resource availability", copy: "A running workload needs compatible compute, memory, storage, and sometimes specialized resources. Capacity is finite." },
        { title: "Supported workloads", copy: "DevHub handles defined project and container workflows; compatibility depends on runtime and workload requirements." },
        { title: "Shared infrastructure", copy: "Projects run on infrastructure managed across the Autheo ecosystem rather than on a developer's local machine." },
        { title: "Placement", copy: "A prepared workload moves to infrastructure that can support its declared needs and available placement choices." },
        { title: "Ongoing expansion", copy: "Additional workload types and ecosystem resources are in development and should not be assumed available today." },
      ]} />
      <WorkflowSteps title="How source becomes a cloud workload" steps={[
        { title: "Prepare source or an image", copy: "Start with a supported project shape and a clear command or container entry point." },
        { title: "Describe requirements", copy: "Configure required values and identify workload needs that influence compatibility." },
        { title: "Build or retrieve the artifact", copy: "DevHub prepares supported source or retrieves a supported container image." },
        { title: "Match available infrastructure", copy: "The platform places the workload where compatible resources and configured regional support are available." },
        { title: "Run and inspect", copy: "The deployment starts, while DevHub surfaces its result and available logs for review." },
      ]} />
      <TwoColumnInfo
        eyebrow="Resource availability"
        title="Availability is specific, not unlimited"
        firstTitle="What users can explore"
        first={<ul><li>Regions represented by the platform</li><li>Available resource and workload information</li><li>Supported deployment paths</li><li>Project-to-infrastructure workflow</li></ul>}
        secondTitle="What can vary"
        second={<p>Capacity, region choice, workload compatibility, and resource support can vary. Universal framework support, unlimited capacity, guaranteed geographic availability, and purchasable Marketplace capacity are not currently available.</p>}
      />
      <DetailCards eyebrow="Who this is for" title="Learn by connecting concepts" items={[
        { title: "Cloud newcomers", copy: "See how source, configuration, builds, resources, and a running deployment relate." },
        { title: "Developers choosing a workload path", copy: "Understand why runtime and resource requirements affect deployment compatibility." },
        { title: "Teams planning growth", copy: "Treat new resource types as expanding capabilities, not guaranteed current capacity." },
      ]} />
      <RelatedRails rails={relatedRails(["build-deploy", "manage-monitor", "marketplace"])} />
      <ClosingCta title="Start with the workload DevHub supports today." copy="Bring a focused project, understand its requirements, and inspect where the deployment path takes it." />
    </>
  );
}
