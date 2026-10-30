import {
  ArrowRight,
  Bot,
  Boxes,
  Check,
  Cloud,
  Code2,
  FolderGit2,
  FolderKanban,
  Gamepad2,
  Rocket,
} from "lucide-react";
import { MarketplacePreview } from "../components/MarketplacePreview";
import { ClosingCta } from "../components/ClosingCta";
import { GamingShowcase } from "../components/GamingShowcase";
import { siteConfig } from "../config";
import { railById, type PageId } from "../rails";
import heroDay from "../assets/hero-day.png";
import heroNight from "../assets/hero-night.png";

const gameCatalogUrl = `${siteConfig.newProjectUrl}?category=games`;

const useCases = [
  {
    number: "01", icon: Code2, title: "Build your first website",
    copy: "Have an idea? Turn it into a website and get it online.",
    detail: "Connect a Git repository or start with a template available in DevHub.",
    rail: "build-deploy" as PageId,
  },
  {
    number: "02", icon: Rocket, title: "Launch an application",
    copy: "Bring your application to life without spending all your time managing infrastructure.",
    detail: "Deploy compatible web projects, services, and supported container workloads.",
    rail: "build-deploy" as PageId,
  },
  {
    number: "03", icon: Bot, title: "AI-assisted development",
    copy: "Use your preferred AI coding assistant to build, then use DevHub to deploy.",
    detail: "DevHub deploys the code you bring; it does not provide the assistant.",
    rail: "ai-assisted" as PageId,
  },
  {
    number: "04", icon: FolderKanban, title: "Manage your projects",
    copy: "Keep track of your applications, deployments, and project activity.",
    detail: "Review builds, deployment history, settings, logs, and workload information.",
    rail: "manage-monitor" as PageId,
  },
  {
    number: "05", icon: Cloud, title: "Explore cloud computing",
    copy: "Learn how applications run on shared, distributed computing infrastructure.",
    detail: "See available regions, resources, services, and workload activity.",
    rail: "cloud-computing" as PageId,
  },
  {
    number: "06", icon: Boxes, title: "Grow your ideas",
    copy: "Start with a small project and explore more resources as your needs grow.",
    detail: "Additional workload types and ecosystem resources are expanding.",
    rail: "cloud-computing" as PageId, status: "In development",
  },
];

const steps = [
  ["01", "Bring your project", "Paste a Git URL, import a connected GitHub repository, choose a listed template, or provide a supported container image."],
  ["02", "Configure the basics", "Choose a project name, add required environment variables, and review settings."],
  ["03", "Deploy with DevHub", "DevHub builds supported source or pulls a supported image, then creates a deployment."],
  ["04", "Manage and inspect", "Follow build progress, review logs, manage deployments, and track project activity."],
];

export function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Autheo DevHub</p>
          <h1>Your Ideas.<br />Your Cloud.<br /><em>Your DevHub.</em></h1>
          <p className="hero-subtitle">
            Build, deploy, and manage supported projects with Autheo DevHub. Whether you&apos;re a
            developer or just getting started, your next idea can begin here.
          </p>
          <p className="hero-mantra">Build It. Deploy It. Run It.</p>
          <div className="hero-actions">
            <a className="button button-primary" href={siteConfig.devHubUrl}>
              Open DevHub <ArrowRight aria-hidden="true" size={17} />
            </a>
            <a className="button button-secondary" href="/getting-started/">I&apos;m New - Start Here</a>
          </div>
          <div className="availability">
            <span><Check aria-hidden="true" size={14} /> DevHub available now</span>
            <span>Marketplace coming soon</span>
          </div>
        </div>
        <div className="hero-art" role="img" aria-label="An illustrated neighborhood representing connected DevHub projects.">
          <img className="hero-day" src={heroDay} alt="" />
          <img className="hero-night" src={heroNight} alt="" />
          <div className="hero-caption">
            <span className="pulse-dot" />
            <div><strong>The neighborhood is taking shape.</strong><small>DevHub is where ideas begin.</small></div>
          </div>
        </div>
      </section>

      <section className="section start-choice" aria-labelledby="start-choice-title">
        <div className="section-heading">
          <p className="eyebrow">Choose your starting point</p>
          <h2 id="start-choice-title">What do you want to launch?</h2>
          <p>Choose a path tailored to building software or hosting a multiplayer game. Both use the same DevHub deployment platform.</p>
        </div>
        <div className="start-choice-grid">
          <a className="start-choice-card" href="/build-deploy/">
            <span className="feature-icon"><FolderGit2 aria-hidden="true" size={23} /></span>
            <span className="status status-available">Developers and creators</span>
            <h3>Build a Website or App</h3>
            <p>Deploy your own code, import a GitHub project, upload a ZIP, or start from a software template.</p>
            <strong>Explore app deployment <ArrowRight aria-hidden="true" size={15} /></strong>
          </a>
          <a className="start-choice-card start-choice-game" href={gameCatalogUrl}>
            <span className="feature-icon"><Gamepad2 aria-hidden="true" size={23} /></span>
            <span className="status status-available">Gamers and communities</span>
            <h3>Host a Game Server</h3>
            <p>Choose a supported game, configure the available settings, and deploy without building an application.</p>
            <strong>Choose your game <ArrowRight aria-hidden="true" size={15} /></strong>
          </a>
        </div>
        <div className="start-choice-actions">
          <a className="button button-secondary" href="/getting-started/">Start Your First Website</a>
          <a className="button button-secondary" href="/ai-assisted/">Build with AI Assistance</a>
          <a className="button button-secondary" href={siteConfig.gettingStartedDocsUrl}>Read DevHub Documentation</a>
        </div>
      </section>

      <GamingShowcase />

      <section className="statement">
        <p>From your first website to your next application,</p>
        <h2>Autheo DevHub helps you bring supported ideas to life.</h2>
        <div className="statement-tags">
          <span>Build</span><i /><span>Deploy</span><i /><span>Manage</span><i /><span>Inspect</span>
        </div>
      </section>

      <section id="build" className="section use-cases" aria-labelledby="build-title">
        <div className="section-heading split-heading">
          <div><p className="eyebrow">What you can build</p><h2 id="build-title">Start with an idea.<br />Take it somewhere real.</h2></div>
          <p>DevHub is an entry point to Autheo&apos;s cloud ecosystem, with approachable tools for supported projects and workloads.</p>
        </div>
        <div className="use-case-grid">
          {useCases.map(({ icon: Icon, ...item }) => {
            const rail = railById[item.rail];
            const status = item.status ?? rail.status;
            return (
            <a className="use-case-card" href={rail.href} key={item.title}>
              <div className="card-top">
                <span className="card-number">{item.number}</span>
                <span className="feature-icon"><Icon aria-hidden="true" size={23} /></span>
              </div>
              <span className={`status ${status === "In development" ? "status-development" : "status-available"}`}>{status}</span>
              <h3>{item.title}</h3><p>{item.copy}</p><small>{item.detail}</small>
              <strong className="card-link">Explore this rail <ArrowRight aria-hidden="true" size={15} /></strong>
            </a>
          )})}
        </div>
      </section>

      <section className="section process" aria-labelledby="process-title">
        <div className="process-intro">
          <p className="eyebrow">How DevHub works</p>
          <h2 id="process-title">A clear path from code to cloud.</h2>
          <p>Project creation, deployment, and day-to-day management come together in one place. Compatibility and availability vary by workload and infrastructure.</p>
          <div className="mini-console" aria-hidden="true">
            <div className="console-bar"><i /><i /><i /></div>
            <code><span>$</span> connect project</code><code><span>$</span> build supported workload</code>
            <code><span>$</span> deploy to Autheo cloud</code><code className="console-success"><Check size={13} /> deployment ready</code>
          </div>
        </div>
        <div className="steps">
          {steps.map(([number, title, copy]) => (
            <article className="step" key={number}><span>{number}</span><div><h3>{title}</h3><p>{copy}</p></div></article>
          ))}
        </div>
      </section>

      <section className="section beginner" aria-labelledby="beginner-title">
        <div className="beginner-art" aria-hidden="true">
          <div className="idea-orbit orbit-one" /><div className="idea-orbit orbit-two" /><Bot size={74} />
          <span className="idea-chip chip-one">&lt;/&gt;</span><span className="idea-chip chip-two">idea</span><span className="idea-chip chip-three">deploy</span>
        </div>
        <div className="beginner-copy">
          <span className="status status-available">Beginner friendly</span>
          <p className="eyebrow">Getting started</p><h2 id="beginner-title">Start small. Learn as you deploy.</h2>
          <p className="lead">Choose a focused project, prepare its files and configuration, then use DevHub to create and inspect a supported deployment.</p>
          <ol><li><span>1</span> Start with a small idea.</li><li><span>2</span> Prepare and review the project.</li><li><span>3</span> Configure required values.</li><li><span>4</span> Deploy, inspect, and refine.</li></ol>
          <p className="fine-print">External AI coding assistants can help create a project, but they are not part of DevHub. Review generated code and never commit secrets.</p>
          <a className="button button-primary" href="/getting-started/">Read the Getting Started guide <ArrowRight aria-hidden="true" size={17} /></a>
        </div>
      </section>

      <MarketplacePreview />
      <ClosingCta title="Build It. Deploy It. Run It." copy="Bring your ideas to life with the tools available in Autheo DevHub today." />
    </>
  );
}
