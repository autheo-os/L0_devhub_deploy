import { CheckCircle2, ExternalLink, FileCode2, Logs, Wrench } from "lucide-react";
import { ClosingCta } from "../components/ClosingCta";
import { CopyBlock } from "../components/CopyBlock";
import { RailHero } from "../components/RailHero";
import { RelatedRails } from "../components/RelatedRails";
import { siteConfig } from "../config";
import { railById, relatedRails } from "../rails";

const packageJson = `{
  "name": "my-first-devhub-site",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "devDependencies": {
    "vite": "^8.3.5"
  }
}`;

const indexHtml = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="My first DevHub website" />
    <title>My First DevHub Site</title>
  </head>
  <body>
    <main id="app"></main>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>`;

const mainJs = `import "./style.css";

document.querySelector("#app").innerHTML = \`
  <section class="card">
    <p class="eyebrow">Hello, DevHub</p>
    <h1>I built and deployed this website.</h1>
    <p>Edit <code>src/main.js</code>, test again, then push your change.</p>
    <a href="https://dev.autheo.com/docs">Read the DevHub docs</a>
  </section>
\`;`;

const styleCss = `:root {
  font-family: system-ui, sans-serif;
  color: #12352c;
  background: #eef5ef;
}

body {
  min-height: 100vh;
  margin: 0;
  display: grid;
  place-items: center;
}

.card {
  width: min(42rem, calc(100% - 3rem));
  padding: 3rem;
  border: 1px solid #bfd4c6;
  border-radius: 1.5rem;
  background: white;
  box-shadow: 0 1.5rem 4rem #12352c1a;
}

.eyebrow, a { color: #087a57; }
h1 { font-size: clamp(2.4rem, 8vw, 5rem); line-height: 1; }
p { line-height: 1.7; }
a { font-weight: 700; }`;

interface GuideStepProps {
  number: string;
  title: string;
  explanation: string;
  navigation: React.ReactNode;
  before: string;
  success: string;
  problems: string[];
  href: string;
  linkLabel: string;
  open?: boolean;
}

function GuideStep({ number, title, explanation, navigation, before, success, problems, href, linkLabel, open }: GuideStepProps) {
  return (
    <details className="guide-step" open={open}>
      <summary>
        <span>{number}</span>
        <div><small>Step {number}</small><h3>{title}</h3><p>{explanation}</p></div>
      </summary>
      <div className="guide-step-body">
        <div><h4>In DevHub</h4><div>{navigation}</div></div>
        <div><h4>Before you start</h4><p>{before}</p></div>
        <div><h4>Success looks like</h4><p>{success}</p></div>
        <div><h4>Common problems</h4><ul>{problems.map((problem) => <li key={problem}>{problem}</li>)}</ul></div>
        <a className="guide-link" href={href}>{linkLabel} <ExternalLink aria-hidden="true" size={14} /></a>
      </div>
    </details>
  );
}

export function GettingStartedPage() {
  const rail = railById["getting-started"];
  return (
    <>
      <RailHero
        status={rail.status}
        eyebrow={rail.eyebrow}
        title="Your First Website on DevHub."
        intro="Create a tiny website, prove that it builds on your computer, put it in a Git repository, and follow the current DevHub interface from sign-in to a live deployment."
        secondaryHref="#six-steps"
        secondaryLabel="Start the six steps"
      >
        <div className="rail-icon-grid">
          <span><FileCode2 aria-hidden="true" /><small>Project files</small></span>
          <span><Wrench aria-hidden="true" /><small>Configuration</small></span>
          <span><CheckCircle2 aria-hidden="true" /><small>Deployment</small></span>
          <span><Logs aria-hidden="true" /><small>Logs</small></span>
        </div>
      </RailHero>

      <section className="detail-section verification-note" aria-labelledby="verification-title">
        <div className="detail-heading">
          <p className="eyebrow">What was verified</p>
          <h2 id="verification-title">Instructions tied to the current interface.</h2>
        </div>
        <div className="verification-grid">
          <article><span className="status status-available">Source verified</span><p>Routes and labels below match the DevHub dashboard implementation: Add New..., Project, Import Git Repository, Clone Template, Build Logs, Visit, Continue to Project, Deployments, Logs, Settings, and Redeploy.</p></article>
          <article><span className="status status-development">Manual confirmation needed</span><p>The public sign-in, sign-up, docs, and protected New Project destinations respond. This review did not create an account or complete a live build, so authentication providers, GitHub authorization, worker capacity, and a successful production deployment still need confirmation in your account.</p></article>
        </div>
      </section>

      <section id="six-steps" className="detail-section" aria-labelledby="steps-title">
        <div className="detail-heading">
          <p className="eyebrow">Click-by-click guide</p>
          <h2 id="steps-title">Six steps to your first website.</h2>
          <p>Open each step when you need it. The Git repository path is the primary path because both the dashboard and official DevHub documentation describe it.</p>
        </div>
        <div className="guide-steps">
          <GuideStep
            number="01"
            title="Create an account or sign in"
            explanation="DevHub uses a dedicated sign-up and sign-in flow before showing the project dashboard."
            navigation={<p>Choose <strong>Open DevHub</strong>. Select <strong>Sign up</strong> for a new account or <strong>Sign in</strong> if you already have one. Follow the identity options shown by DevHub. After authentication, the home page becomes the <strong>Autheo Development Hub</strong> dashboard.</p>}
            before="An email address or another identity method offered on the live sign-in screen."
            success="You see the dashboard with Search Projects and the Add New... control, not the public marketing page."
            problems={["Private browsing or blocked cookies can prevent the session from settling.", "The available identity providers are environment configuration, so use only the options shown on screen."]}
            href={siteConfig.signUpUrl}
            linkLabel="Open DevHub sign-up"
            open
          />
          <GuideStep
            number="02"
            title="Create a simple website"
            explanation="Use the example below, write your own, or ask an external AI coding assistant for help."
            navigation={<p>This work happens on your computer, not inside DevHub. DevHub does not include an AI coding assistant. If you want help generating files, use the copyable prompt in the <a href="/ai-assisted/">AI-assisted guide</a>.</p>}
            before="Node.js 20 or newer, npm, a code editor, and a small idea."
            success="The page opens locally and you understand which files control its words and styles."
            problems={["Generated code may include packages or behavior you did not ask for.", "An AI assistant may say a project works without actually running its build."]}
            href="/ai-assisted/"
            linkLabel="Build with AI Assistance"
          />
          <GuideStep
            number="03"
            title="Prepare the files for deployment"
            explanation="Install dependencies and run the production build before DevHub sees the project."
            navigation={<p>In a terminal inside the project folder, run <code>npm install</code>, then <code>npm run build</code>. For the example below, success creates a <code>dist/</code> directory. Commit <code>package.json</code>, <code>package-lock.json</code>, <code>index.html</code>, and <code>src/</code> to Git. Do not commit <code>node_modules</code>, <code>dist</code>, or secrets.</p>}
            before="A complete project folder and a terminal open in that folder."
            success="npm run build exits successfully and the generated site works with npm run preview."
            problems={["A missing package usually means npm install did not finish or package.json is incomplete.", "A local development server working does not prove the production build works."]}
            href="#example"
            linkLabel="Use the reproducible example"
          />
          <GuideStep
            number="04"
            title="Create a DevHub project from Git"
            explanation="Put the prepared project in a GitHub repository, then give DevHub that repository URL."
            navigation={<p>From the dashboard choose <strong>Add New...</strong> then <strong>Project</strong>. On <strong>Let&apos;s build something new</strong>, paste the public Git repository URL into <strong>Git repository URL or container image</strong> and select <strong>Deploy</strong>. You can instead connect GitHub and use <strong>Import Git Repository</strong>. The page also contains <strong>Clone Template</strong>; template availability does not prove every upstream example currently builds.</p>}
            before="A Git repository containing the exact revision that passed your local build. Private repositories require a working GitHub connection."
            success="DevHub accepts the source and opens Preparing Git Repository, followed by the live build page."
            problems={["A private repository cannot be cloned until GitHub authorization is valid.", "Worker or isolated-builder availability can prevent a source build even when the repository is correct."]}
            href={siteConfig.newProjectUrl}
            linkLabel="Open New Project"
          />
          <GuideStep
            number="05"
            title="Deploy and open the website"
            explanation="Watch the build instead of assuming that clicking Deploy means the site is live."
            navigation={<p>The build page shows <strong>Build Logs</strong> and a status such as Building, Deployment ready, or Deployment failed. Wait for <strong>Deployment ready</strong>, then choose <strong>Visit</strong> to open the deployment URL or <strong>Continue to Project</strong> to inspect the project.</p>}
            before="A project accepted by the New Project flow and available compatible infrastructure."
            success="The status says Deployment ready and the Visit link opens the page you tested locally."
            problems={["Build success and runtime success are different; open the URL and check the page.", "A domain may not be assigned yet while a build is still queued, failed, or waiting on infrastructure."]}
            href={siteConfig.gettingStartedDocsUrl}
            linkLabel="Read the official quickstart"
          />
          <GuideStep
            number="06"
            title="Update, redeploy, and inspect logs"
            explanation="Make one visible edit, verify it locally, and deploy the new revision."
            navigation={<p>For a connected Git project, push the commit. Automatic deploys depend on a successfully installed webhook or workflow, so check <strong>Project Settings</strong> then <strong>Git</strong> if nothing starts. To deploy manually, open the project&apos;s <strong>Deployments</strong> tab, open a deployment or its action menu, and choose <strong>Redeploy</strong>. Build output appears under <strong>Build Logs</strong>; request and runtime activity is available from the project <strong>Logs</strong> tab.</p>}
            before="A committed change that passes npm run build, plus access to the project."
            success="A new deployment record reaches Ready and its URL shows the updated text."
            problems={["Saving Build or Environment Variable settings does not change a running deployment until a new deployment is created.", "Push-to-deploy is environment-dependent when the GitHub webhook or workflow could not be installed."]}
            href="/manage-monitor/"
            linkLabel="Learn to manage deployments"
          />
        </div>
      </section>

      <section id="example" className="detail-section example-project" aria-labelledby="example-title">
        <div className="detail-heading">
          <p className="eyebrow">Working example</p>
          <h2 id="example-title">A small Vite website you can reproduce.</h2>
          <p>DevHub&apos;s New Project interface lists Vite + React and HTML starters, its build settings include Vite, and the backend serves the generated output directory. This example uses plain JavaScript with Vite to keep the files understandable.</p>
        </div>
        <div className="example-structure">
          <div>
            <h3>Project structure</h3>
            <pre><code>{`my-first-devhub-site/
|-- index.html
|-- package.json
|-- package-lock.json
|-- src/
    |-- main.js
    |-- style.css`}</code></pre>
          </div>
          <div>
            <h3>Build it locally</h3>
            <ol>
              <li>Create the folders and files shown here.</li>
              <li>Run <code>npm install</code>.</li>
              <li>Run <code>npm run dev</code> and open the local URL.</li>
              <li>Run <code>npm run build</code>, then <code>npm run preview</code>.</li>
              <li>Commit the source and lockfile to a Git repository.</li>
            </ol>
          </div>
        </div>
        <div className="example-files">
          <CopyBlock label="package.json" code={packageJson} />
          <CopyBlock label="index.html" code={indexHtml} />
          <CopyBlock label="src/main.js" code={mainJs} />
          <CopyBlock label="src/style.css" code={styleCss} />
        </div>
        <p className="guide-callout"><strong>Security:</strong> this example needs no secrets. If a later project uses API keys, add them in <strong>Project Settings - Environment Variables</strong>. Never put a secret in browser code, a public Git repository, or an AI prompt.</p>
      </section>

      <section className="detail-section" aria-labelledby="interface-title">
        <div className="detail-heading">
          <p className="eyebrow">Interface map</p>
          <h2 id="interface-title">Where the current controls live.</h2>
          <p>These are text illustrations based on the dashboard source, not screenshots of a completed live account.</p>
        </div>
        <div className="interface-map">
          <article><span>Dashboard</span><strong>Add New... - Project</strong><p>Starts at <code>/new</code>.</p></article>
          <article><span>New Project</span><strong>Git URL, Import Git Repository, or Clone Template</strong><p>Choose source, project name, team, and optional environment variables.</p></article>
          <article><span>Project - Settings</span><strong>Build &amp; Development</strong><p>Framework Preset, Build Command, Output Directory, Install Command, and Root Directory.</p></article>
          <article><span>Project - Settings</span><strong>Environment Variables</strong><p>Add a key, value, target environment, build/runtime scope, and Sensitive setting.</p></article>
          <article><span>Build page</span><strong>Build Logs - Visit - Continue to Project</strong><p>Use the result, not the button click, as proof of deployment.</p></article>
          <article><span>Project</span><strong>Deployments - Logs - Settings</strong><p>Inspect history, request activity, configuration, and the Redeploy action.</p></article>
        </div>
      </section>

      <section className="detail-section troubleshooting" aria-labelledby="troubleshooting-title">
        <div className="detail-heading">
          <p className="eyebrow">First-deployment troubleshooting</p>
          <h2 id="troubleshooting-title">Start with the earliest useful log line.</h2>
        </div>
        <div className="troubleshooting-grid">
          <article><h3>Build failed</h3><p>Open Build Logs, find the first error, run the same build command locally, and fix one cause at a time.</p></article>
          <article><h3>Missing dependencies</h3><p>Check package.json and commit the lockfile. Do not upload node_modules; DevHub installs declared dependencies during a source build.</p></article>
          <article><h3>Incorrect output directory</h3><p>Confirm the local build creates the directory configured under Settings - Build &amp; Development. Vite normally creates dist.</p></article>
          <article><h3>Environment variables</h3><p>Add required keys under Settings - Environment Variables, choose the correct environment and scope, then create a new deployment.</p></article>
          <article><h3>Runtime or port mismatch</h3><p>Server projects must listen as the platform expects. Container images may need an explicit container port and protocol; a static Vite site does not.</p></article>
          <article><h3>Domain or DNS not ready</h3><p>First use the generated deployment URL. A custom domain also needs ownership verification, DNS, and certificate setup.</p></article>
          <article><h3>Worker or infrastructure unavailable</h3><p>A correct project can still wait or fail when compatible build or runtime capacity is unavailable. Keep the logs and retry only after checking platform status.</p></article>
          <article><h3>Deployment not found</h3><p>The build may be on a node the current page cannot reach. Check Deployments, refresh later, and use the documented recovery steps.</p><a href={siteConfig.deploymentNotFoundDocsUrl}>Read Deployment Not Found help</a></article>
        </div>
      </section>

      <RelatedRails rails={relatedRails(["ai-assisted", "build-deploy", "manage-monitor"])} />
      <ClosingCta title="Start with something small and understandable." copy="Build it locally, put it in Git, open DevHub, and let the deployment result guide your next step." label="Open DevHub" />
    </>
  );
}
