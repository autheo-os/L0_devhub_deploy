import { CheckCircle2, FileCode2, Logs, Wrench } from "lucide-react";
import { ClosingCta } from "../components/ClosingCta";
import { DetailCards, TwoColumnInfo } from "../components/DetailBlocks";
import { RailHero } from "../components/RailHero";
import { RelatedRails } from "../components/RelatedRails";
import { WorkflowSteps } from "../components/WorkflowSteps";
import { railById, relatedRails } from "../rails";

export function GettingStartedPage() {
  const rail = railById["getting-started"];
  return (
    <>
      <RailHero
        status={rail.status}
        eyebrow={rail.eyebrow}
        title="Your first DevHub deployment, one clear step at a time."
        intro="Begin with a small project you can run locally. Prepare its source and configuration, bring it into DevHub through a supported method, then use build progress and logs to learn from the result."
        secondaryHref="#first-project"
        secondaryLabel="Plan your first project"
      >
        <div className="rail-icon-grid">
          <span><FileCode2 aria-hidden="true" /><small>Project files</small></span>
          <span><Wrench aria-hidden="true" /><small>Configuration</small></span>
          <span><CheckCircle2 aria-hidden="true" /><small>Deployment</small></span>
          <span><Logs aria-hidden="true" /><small>Logs</small></span>
        </div>
      </RailHero>
      <div id="first-project">
        <DetailCards eyebrow="Before you begin" title="Bring a project you can explain" items={[
          { title: "A focused project", copy: "Choose one page or a small service before attempting a multi-service system." },
          { title: "Complete source files", copy: "Gather the code, dependency manifest, generated files, and configuration examples the project needs." },
          { title: "A known entry point", copy: "Know the command or image behavior that starts the workload and which port it expects." },
          { title: "Required values", copy: "List environment variables and separate sensitive values from source control." },
          { title: "A local check", copy: "Run the project on your own machine first so deployment is not the first time it executes." },
          { title: "A supported path", copy: "Use an available Git, project-upload, or supported image workflow that matches your project." },
        ]} />
      </div>
      <WorkflowSteps title="A beginner-friendly deployment path" steps={[
        { title: "Choose a small first project", copy: "A simple website or focused web service makes configuration and troubleshooting easier to understand." },
        { title: "Prepare the project", copy: "Confirm dependencies, start behavior, required files, and that the project runs locally." },
        { title: "Connect or import it", copy: "Bring source into DevHub with a supported Git or upload workflow, or use a compatible image where appropriate." },
        { title: "Configure required values", copy: "Add environment variables and review project settings without committing secrets." },
        { title: "Create the deployment", copy: "Start the supported build or image workflow and follow the surfaced progress." },
        { title: "Inspect progress and logs", copy: "Review the deployment result and available logs before deciding what to change." },
      ]} />
      <TwoColumnInfo
        eyebrow="When something fails"
        title="Treat the first error as information"
        firstTitle="Check the project"
        first={<ul><li>Does the entry point exist?</li><li>Are all dependencies and generated files included?</li><li>Are required environment values configured?</li><li>Does the same revision run locally?</li></ul>}
        secondTitle="Then use DevHub evidence"
        second={<p>Read build progress and available logs for the earliest actionable message. Change one understood issue, verify locally when possible, and deploy again. Infrastructure support and workload compatibility can also affect the result.</p>}
      />
      <DetailCards eyebrow="Choose your next guide" title="Go deeper when you are ready" items={[
        { title: "Building with an AI assistant", copy: "Learn how an external tool can fit into a reviewed, deployment-ready workflow." },
        { title: "Build & Deploy", copy: "Understand the supported source, configuration, image, and deployment path in more detail." },
        { title: "Manage & Monitor", copy: "Learn where project history, deployment state, logs, settings, and workload views fit." },
      ]} />
      <RelatedRails rails={relatedRails(["ai-assisted", "build-deploy", "manage-monitor"])} />
      <ClosingCta title="Start with something small and understandable." copy="Prepare the project, launch DevHub, and use the deployment result to guide your next step." />
    </>
  );
}
