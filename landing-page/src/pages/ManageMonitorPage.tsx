import { Activity, FileClock, Logs, SlidersHorizontal } from "lucide-react";
import { ClosingCta } from "../components/ClosingCta";
import { DetailCards, TwoColumnInfo } from "../components/DetailBlocks";
import { RailHero } from "../components/RailHero";
import { RelatedRails } from "../components/RelatedRails";
import { WorkflowSteps } from "../components/WorkflowSteps";
import { railById, relatedRails } from "../rails";

export function ManageMonitorPage() {
  const rail = railById["manage-monitor"];
  return (
    <>
      <RailHero
        status={rail.status}
        eyebrow={rail.eyebrow}
        title="Manage the lifecycle. Inspect what happened."
        intro="DevHub brings project settings, deployments, build activity, logs, and workload views together so you can review a project from creation through ongoing changes."
        secondaryHref="/build-deploy/"
        secondaryLabel="Explore Build & Deploy"
      >
        <div className="rail-icon-grid">
          <span><Activity aria-hidden="true" /><small>Deployments</small></span>
          <span><FileClock aria-hidden="true" /><small>History</small></span>
          <span><Logs aria-hidden="true" /><small>Logs</small></span>
          <span><SlidersHorizontal aria-hidden="true" /><small>Settings</small></span>
        </div>
      </RailHero>
      <DetailCards eyebrow="What this rail helps you do" title="Keep project activity in context" items={[
        { title: "Create and organize projects", copy: "Establish a project workspace for source, configuration, and deployment activity." },
        { title: "Manage deployments", copy: "Review deployment records and the current state of workloads associated with a project." },
        { title: "Review build history", copy: "Look back through build and deployment activity when comparing changes or investigating a result." },
        { title: "Inspect logs", copy: "Read available build and workload logs for clues about startup, configuration, and runtime behavior." },
        { title: "Update settings", copy: "Manage project configuration and required environment values as the workload changes." },
        { title: "Review workload views", copy: "Use the surfaced workload information to understand what DevHub is currently managing." },
      ]} />
      <WorkflowSteps title="A practical management loop" steps={[
        { title: "Open the project", copy: "Start from the project workspace that groups its configuration and deployment activity." },
        { title: "Choose a deployment", copy: "Review the deployment and build record relevant to the change or issue you are investigating." },
        { title: "Follow build progress", copy: "Inspect the surfaced state as source is prepared and the workload is deployed." },
        { title: "Read logs", copy: "Use available logs to identify missing values, entry-point problems, or application-level failures." },
        { title: "Manage the next change", copy: "Adjust project settings or source, then create another deployment and review its result." },
      ]} />
      <TwoColumnInfo
        eyebrow="Project visibility"
        title="See the information available in DevHub"
        firstTitle="Included project views"
        first={<ul><li>Project and deployment records</li><li>Build and deployment activity</li><li>Available logs and settings</li><li>Workload-oriented views</li></ul>}
        secondTitle="Monitoring availability"
        second={<p>Available monitoring focuses on project, deployment, build, log, settings, and workload views. Full application-performance monitoring, distributed tracing, alerting, and guaranteed uptime monitoring are not currently included.</p>}
      />
      <DetailCards eyebrow="Who this is for" title="Useful throughout a project" items={[
        { title: "Builders troubleshooting a deploy", copy: "Trace a failed or incomplete result through build state, deployment status, and logs." },
        { title: "Teams reviewing changes", copy: "Use deployment history and settings to understand how a project evolved." },
        { title: "Project owners", copy: "Return to one workspace to review ongoing workload and deployment activity." },
      ]} />
      <RelatedRails rails={relatedRails(["build-deploy", "cloud-computing", "getting-started"])} />
      <ClosingCta title="Keep the next deployment understandable." copy="Open DevHub to review your projects, deployments, settings, and available logs." />
    </>
  );
}
