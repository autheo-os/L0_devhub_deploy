import { Code2, Container, GitBranch, Settings2 } from "lucide-react";
import { ClosingCta } from "../components/ClosingCta";
import { DetailCards, TwoColumnInfo } from "../components/DetailBlocks";
import { RailHero } from "../components/RailHero";
import { RelatedRails } from "../components/RelatedRails";
import { WorkflowSteps } from "../components/WorkflowSteps";
import { railById, relatedRails } from "../rails";

export function BuildDeployPage() {
  const rail = railById["build-deploy"];
  return (
    <>
      <RailHero
        status={rail.status}
        eyebrow={rail.eyebrow}
        title="Build and deploy with a path you can follow."
        intro="Bring a compatible website, application, service, or container workload. DevHub helps configure the project, build supported source or pull a supported image, and create a deployment you can inspect."
        secondaryHref="#workflow"
        secondaryLabel="See the workflow"
      >
        <div className="rail-icon-grid">
          <span><GitBranch aria-hidden="true" /><small>Git source</small></span>
          <span><Code2 aria-hidden="true" /><small>Web & services</small></span>
          <span><Container aria-hidden="true" /><small>Containers</small></span>
          <span><Settings2 aria-hidden="true" /><small>Configuration</small></span>
        </div>
      </RailHero>
      <DetailCards eyebrow="What this rail helps you do" title="Move a prepared project into a deployment" items={[
        { title: "Deploy websites", copy: "Bring supported website source and create a hosted deployment through DevHub." },
        { title: "Run applications and services", copy: "Deploy compatible web applications and service workloads with an appropriate entry point." },
        { title: "Use Git-based source", copy: "Connect supported Git repository workflows so project source can move into the build process." },
        { title: "Bring a container image", copy: "Use supported container-image workloads when the image and runtime requirements are compatible." },
        { title: "Configure the environment", copy: "Provide required environment variables and project settings without putting secrets in source." },
        { title: "Inspect the outcome", copy: "Review build status, deployment state, and logs to understand what happened." },
      ]} />
      <div id="workflow">
        <WorkflowSteps title="From project to running workload" steps={[
          { title: "Bring a project", copy: "Choose an available starter, connect supported Git source, upload prepared project files, or provide a supported container image." },
          { title: "Configure project basics", copy: "Name the project, select relevant settings, and add the environment values the workload requires." },
          { title: "Build or pull", copy: "DevHub builds compatible source workloads or pulls the configured supported image." },
          { title: "Create a deployment", copy: "The prepared workload is assigned to available compatible infrastructure and started." },
          { title: "Inspect the result", copy: "Review progress, deployment state, and logs. Correct project-level failures and deploy again." },
        ]} />
      </div>
      <TwoColumnInfo
        eyebrow="Capabilities and boundaries"
        title="Compatibility matters"
        firstTitle="Available today"
        first={<ul><li>Project creation and configuration</li><li>Supported Git and upload workflows</li><li>Compatible web, service, and container deployments</li><li>Build status, deployment results, and logs</li></ul>}
        secondTitle="Plan for variation"
        second={<p>Not every framework, image, architecture, port layout, or runtime requirement is supported. Confirm the workload entry point, dependencies, required values, and resource needs before deploying.</p>}
      />
      <DetailCards eyebrow="Who this is for" title="Useful starting points" items={[
        { title: "First-time publishers", copy: "Move a small static or web project from local development to a hosted result." },
        { title: "Application teams", copy: "Create repeatable deployments from supported project source and configuration." },
        { title: "Container users", copy: "Run a compatible prebuilt image without presenting container support as universal." },
      ]} />
      <RelatedRails rails={relatedRails(["manage-monitor", "getting-started", "cloud-computing"])} />
      <ClosingCta title="Bring a prepared project to DevHub." copy="Check compatibility, configure what it needs, and create a deployment you can inspect." />
    </>
  );
}
