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
        intro="Bring a compatible website, application, service, or container workload. The current New Project interface accepts a Git URL, connected GitHub repository, listed template, or container image and then opens build progress you can inspect."
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
        { title: "Deploy websites", copy: "Bring supported website source through Git and create a deployment through DevHub." },
        { title: "Run applications and services", copy: "Deploy compatible web applications and service workloads with an appropriate entry point." },
        { title: "Use Git-based source", copy: "Connect supported Git repository workflows so project source can move into the build process." },
        { title: "Bring a container image", copy: "Use supported container-image workloads when the image and runtime requirements are compatible." },
        { title: "Configure the environment", copy: "Provide required environment variables and project settings without putting secrets in source." },
        { title: "Inspect the outcome", copy: "Review build status, deployment state, and logs to understand what happened." },
      ]} />
      <div id="workflow">
        <WorkflowSteps title="From project to running workload" steps={[
          { title: "Bring a project", copy: "From the dashboard, choose Add New... then Project. Paste a Git URL, import a connected GitHub repository, select a listed template, or provide a container image." },
          { title: "Configure project basics", copy: "Set the project name and team. Expand Environment Variables when the build or runtime needs values." },
          { title: "Build or pull", copy: "DevHub builds compatible source workloads or pulls the configured supported image." },
          { title: "Create a deployment", copy: "The prepared workload is assigned to available compatible infrastructure and started." },
          { title: "Inspect the result", copy: "Review progress, deployment state, and logs. Correct project-level failures and deploy again." },
        ]} />
      </div>
      <TwoColumnInfo
        eyebrow="Choose the right deployment path"
        title="Start with a supported project"
        firstTitle="Available project sources"
        first={<ul><li>Git URL and connected GitHub import</li><li>Listed source templates and container-image input</li><li>Build settings and environment variables</li><li>Build status, deployment details, URLs, and logs</li></ul>}
        secondTitle="Availability considerations"
        second={<p>Template compatibility, private Git access, build and runtime capacity, domains, and automatic push-to-deploy can vary by project and environment. Use the options shown in your account and check the build status and logs after deployment.</p>}
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
