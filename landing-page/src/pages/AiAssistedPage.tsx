import { Bot, FileCheck2, KeyRound, ShieldCheck } from "lucide-react";
import { ClosingCta } from "../components/ClosingCta";
import { DetailCards, TwoColumnInfo } from "../components/DetailBlocks";
import { RailHero } from "../components/RailHero";
import { RelatedRails } from "../components/RelatedRails";
import { WorkflowSteps } from "../components/WorkflowSteps";
import { railById, relatedRails } from "../rails";

export function AiAssistedPage() {
  const rail = railById["ai-assisted"];
  return (
    <>
      <RailHero
        status={rail.status}
        eyebrow={rail.eyebrow}
        title="Use an AI coding assistant. Bring the result to DevHub."
        intro="DevHub does not currently provide an AI coding assistant. You can work with a preferred external tool to create a project, review and prepare the files yourself, then use a supported DevHub method to deploy the result."
        secondaryHref="/getting-started/"
        secondaryLabel="Read the beginner guide"
      >
        <div className="rail-callout">
          <Bot aria-hidden="true" size={34} />
          <strong>External tool, human review</strong>
          <p>The assistant helps produce code. You remain responsible for reviewing it and making the project deployment-ready.</p>
        </div>
      </RailHero>
      <DetailCards eyebrow="What this workflow helps you do" title="Turn a prompt into a reviewed project" items={[
        { title: "Shape a focused idea", copy: "Describe a small, testable outcome to the external assistant rather than beginning with an undefined system." },
        { title: "Generate a starting point", copy: "Use the assistant to draft project files, explain unfamiliar code, or suggest changes." },
        { title: "Review every file", copy: "Treat generated output as untrusted until you understand the dependencies, behavior, and security implications." },
        { title: "Prepare for deployment", copy: "Confirm the entry point, include generated assets, and identify every required environment value." },
        { title: "Deploy through DevHub", copy: "Import or upload the resulting project using a method supported by DevHub." },
        { title: "Inspect and revise", copy: "Read build progress and logs, make a deliberate fix, and deploy the reviewed change." },
      ]} />
      <WorkflowSteps title="Idea to inspected deployment" steps={[
        { title: "Describe the idea", copy: "Give the external assistant a narrow goal, expected behavior, and known technical constraints." },
        { title: "Build with the external tool", copy: "Generate or modify the project while asking the tool to explain important choices." },
        { title: "Review the files", copy: "Check source, dependencies, scripts, generated files, licenses, and security-sensitive behavior." },
        { title: "Prepare the project", copy: "Confirm its entry point and environment variables, include needed files, and run it locally." },
        { title: "Import or upload", copy: "Use a supported DevHub source method to bring in the prepared project." },
        { title: "Deploy and inspect", copy: "Follow build state and logs. Do not assume generated code is correct because it built successfully." },
      ]} />
      <TwoColumnInfo
        eyebrow="Readiness checklist"
        title="Human judgment stays in the loop"
        firstTitle="Before deployment"
        first={<ul><li><FileCheck2 aria-hidden="true" size={15} /> Confirm the start command or entry point</li><li><KeyRound aria-hidden="true" size={15} /> List required environment variables</li><li><FileCheck2 aria-hidden="true" size={15} /> Include generated and build-required files</li><li><ShieldCheck aria-hidden="true" size={15} /> Run and review the project locally</li></ul>}
        secondTitle="Security basics"
        second={<p>Never commit secrets, tokens, or private keys. Review AI-generated code and dependencies before deployment. Use DevHub environment configuration for required sensitive values rather than embedding them in source.</p>}
      />
      <DetailCards eyebrow="Who this is for" title="A workflow for assisted building" items={[
        { title: "New builders", copy: "Use an external assistant to learn and create a small project while retaining ownership of the result." },
        { title: "Developers prototyping", copy: "Move quickly from an assisted draft to a locally verified deployment candidate." },
        { title: "Teams reviewing generated code", copy: "Make review, configuration, and deployment inspection explicit parts of the process." },
      ]} />
      <RelatedRails rails={relatedRails(["getting-started", "build-deploy", "manage-monitor"])} />
      <ClosingCta title="Deploy the code you have reviewed." copy="When the project runs locally and its requirements are clear, bring it to DevHub through a supported workflow." />
    </>
  );
}
