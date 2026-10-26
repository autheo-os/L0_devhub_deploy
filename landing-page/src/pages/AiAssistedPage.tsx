import { Bot, FileCheck2, KeyRound, ShieldCheck } from "lucide-react";
import { ClosingCta } from "../components/ClosingCta";
import { CopyBlock } from "../components/CopyBlock";
import { DetailCards, TwoColumnInfo } from "../components/DetailBlocks";
import { RailHero } from "../components/RailHero";
import { RelatedRails } from "../components/RelatedRails";
import { WorkflowSteps } from "../components/WorkflowSteps";
import { railById, relatedRails } from "../rails";

const beginnerPrompt = `Help me create a small static website that I can deploy through Autheo DevHub.

Use plain JavaScript and Vite. Create only these files:
- package.json
- index.html
- src/main.js
- src/style.css

Requirements:
- Use Node.js 20 or newer.
- Include npm scripts named dev, build, and preview.
- The production build must write to dist/.
- Make the page responsive and keyboard accessible.
- Do not add analytics, authentication, a database, external APIs, secrets, or environment variables.
- Do not invent DevHub configuration files or claim the deployment succeeded.
- Explain every dependency and every file.
- Give me the exact commands to run npm install, npm run dev, npm run build, and npm run preview.
- End with a checklist for reviewing the code before I put it in a Git repository.

The website should be a one-page personal introduction with a heading, a short paragraph, and one link. Ask me for the text before generating the files.`;

const reviewPrompt = `Review this small Vite project for deployment readiness.

Check:
1. package.json has complete dependencies and dev/build/preview scripts.
2. npm run build should produce dist/.
3. Every imported file exists with matching capitalization.
4. No secret, token, private key, or .env value is in the source.
5. Browser code does not depend on a server-only API.
6. The page is responsive and usable with a keyboard.

Do not say it is ready unless you can explain each check. Give me local commands to verify it. DevHub will handle the supported deployment workflow; do not claim you deployed anything.`;

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
        { title: "Deploy through DevHub", copy: "Put the reviewed project in Git, then use the verified Git URL or connected GitHub import path." },
        { title: "Inspect and revise", copy: "Read build progress and logs, make a deliberate fix, and deploy the reviewed change." },
      ]} />
      <WorkflowSteps title="Idea to inspected deployment" steps={[
        { title: "Describe the idea", copy: "Give the external assistant a narrow goal, expected behavior, and known technical constraints." },
        { title: "Build with the external tool", copy: "Generate or modify the project while asking the tool to explain important choices." },
        { title: "Review the files", copy: "Check source, dependencies, scripts, generated files, licenses, and security-sensitive behavior." },
        { title: "Prepare the project", copy: "Confirm its entry point and environment variables, include needed files, and run it locally." },
        { title: "Import from Git", copy: "Paste the public repository URL or import it through a working GitHub connection." },
        { title: "Deploy and inspect", copy: "Follow build state and logs. Do not assume generated code is correct because it built successfully." },
      ]} />
      <section className="detail-section prompt-section" aria-labelledby="prompt-title">
        <div className="detail-heading">
          <p className="eyebrow">Copyable prompts</p>
          <h2 id="prompt-title">Ask for a small, verifiable project.</h2>
          <p>Paste this into ChatGPT, Cursor, Claude, or another coding assistant. The assistant creates files on your computer. DevHub handles the supported import, build, and deployment workflow afterward.</p>
        </div>
        <div className="prompt-grid">
          <CopyBlock label="Beginner website prompt" code={beginnerPrompt} />
          <CopyBlock label="Deployment-readiness review prompt" code={reviewPrompt} />
        </div>
      </section>
      <section className="detail-section" aria-labelledby="ai-output-title">
        <div className="detail-heading">
          <p className="eyebrow">Expected output</p>
          <h2 id="ai-output-title">Know what the assistant should produce.</h2>
        </div>
        <div className="example-structure">
          <div>
            <h3>Small project structure</h3>
            <pre><code>{`my-first-site/
|-- index.html
|-- package.json
|-- package-lock.json
|-- src/
    |-- main.js
    |-- style.css`}</code></pre>
          </div>
          <div>
            <h3>Verify before Git or DevHub</h3>
            <ol>
              <li>Read every generated file and dependency.</li>
              <li>Run <code>npm install</code>.</li>
              <li>Run <code>npm run dev</code> and inspect the page.</li>
              <li>Run <code>npm run build</code> and confirm <code>dist/</code> exists.</li>
              <li>Run <code>npm run preview</code> and inspect the production output.</li>
            </ol>
          </div>
        </div>
        <p className="guide-callout"><strong>Never paste secrets into an AI chat.</strong> Do not accept unexplained packages, remote scripts, hidden trackers, or code that sends data elsewhere. Keep API keys out of browser code and Git. Add required secrets later through DevHub&apos;s Environment Variables interface.</p>
        <p className="guide-callout"><strong>Do not confuse generation with deployment.</strong> An assistant can create or edit a project and explain commands. It cannot prove that your DevHub account, GitHub connection, build worker, domain, or live deployment works unless those systems were actually used and inspected.</p>
      </section>
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
      <ClosingCta title="Deploy the code you have reviewed." copy="When the project runs locally and its requirements are clear, follow the verified Git workflow in the beginner guide." href="/getting-started/#six-steps" label="Follow the beginner guide" />
    </>
  );
}
