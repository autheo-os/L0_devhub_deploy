import { useEffect, useState } from "react";
import {
  Activity,
  ArrowRight,
  Bot,
  Boxes,
  Check,
  Cloud,
  Code2,
  FolderKanban,
  Menu,
  Moon,
  Rocket,
  Sun,
  X,
} from "lucide-react";
import { MarketplacePreview } from "./components/MarketplacePreview";
import { siteConfig } from "./config";
import heroDay from "./assets/hero-day.png";
import heroNight from "./assets/hero-night.png";

type Theme = "day" | "night";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "What You Can Build", href: "#build" },
  { label: "How DevHub Works", href: "#how-it-works" },
  { label: "Getting Started", href: "#getting-started" },
  { label: "Marketplace", note: "Coming Soon", href: "#marketplace" },
];

const useCases = [
  {
    number: "01",
    icon: Code2,
    title: "Build your first website",
    copy: "Have an idea? Turn it into a website and get it online.",
    detail: "Start from a template, a Git repository, or a project you upload.",
    status: "Available",
  },
  {
    number: "02",
    icon: Rocket,
    title: "Launch an application",
    copy: "Bring your application to life without spending all your time managing infrastructure.",
    detail: "Deploy supported web projects, services, and container-based workloads.",
    status: "Available",
  },
  {
    number: "03",
    icon: Bot,
    title: "AI-assisted development",
    copy: "Use your favorite AI coding assistant to help build your project, then use DevHub to deploy it.",
    detail: "Bring the code your assistant helps you create. DevHub does not provide the assistant.",
    status: "Available workflow",
  },
  {
    number: "04",
    icon: FolderKanban,
    title: "Manage your projects",
    copy: "Keep track of your applications, deployments, and project activity.",
    detail: "Review builds, deployment history, settings, and logs in one workspace.",
    status: "Available",
  },
  {
    number: "05",
    icon: Cloud,
    title: "Explore cloud computing",
    copy: "Learn how modern applications run on shared, distributed computing infrastructure.",
    detail: "See regions, resources, services, and workload activity from your dashboard.",
    status: "Available",
  },
  {
    number: "06",
    icon: Boxes,
    title: "Grow your ideas",
    copy: "Start with a small project and explore additional resources as your needs grow.",
    detail: "Additional workload types and ecosystem resources will continue to expand.",
    status: "In development",
  },
];

const steps = [
  ["01", "Bring your project", "Import a Git repository, choose a starter, upload a project, or use a supported container image."],
  ["02", "Configure the basics", "Choose a project name, add required environment variables, and review supported settings."],
  ["03", "Deploy with DevHub", "DevHub builds your source or pulls your image, then creates a deployment."],
  ["04", "Manage and monitor", "Follow build progress, review logs, manage deployments, and keep track of project activity."],
];

export function App() {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem("autheo-landing-theme");
    if (saved === "day" || saved === "night") return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "night" : "day";
  });
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("autheo-landing-theme", theme);
  }, [theme]);

  useEffect(() => {
    const close = (event: KeyboardEvent) => event.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);

  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="brand" href="#home" aria-label="Autheo DevHub home">
          <span className="brand-mark">A</span>
          <span>autheo</span>
          <small>DevHub</small>
        </a>

        <nav className={`site-nav ${menuOpen ? "is-open" : ""}`} aria-label="Primary navigation">
          {navItems.map((item) => (
            <a href={item.href} key={item.label} onClick={() => setMenuOpen(false)}>
              <span>{item.label}</span>
              {item.note && <small>{item.note}</small>}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <button
            className="theme-toggle"
            type="button"
            aria-label={`Switch to ${theme === "day" ? "night" : "day"} mode`}
            onClick={() => setTheme((value) => (value === "day" ? "night" : "day"))}
          >
            {theme === "day" ? <Moon size={18} /> : <Sun size={18} />}
          </button>
          <a className="button button-primary header-cta" href={siteConfig.devHubUrl}>
            Launch DevHub <ArrowRight size={16} />
          </a>
          <button
            className="menu-button"
            type="button"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((value) => !value)}
          >
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </header>

      <main>
        <section id="home" className="hero">
          <div className="hero-copy">
            <p className="eyebrow">Autheo DevHub</p>
            <h1>Your Ideas.<br />Your Cloud.<br /><em>Your DevHub.</em></h1>
            <p className="hero-subtitle">
              Build, deploy, and manage your projects with Autheo DevHub. Whether you&apos;re a
              developer or just getting started, your next big idea starts here.
            </p>
            <p className="hero-mantra">Build It. Deploy It. Run It.</p>
            <div className="hero-actions">
              <a className="button button-primary" href={siteConfig.devHubUrl}>
                Launch DevHub <ArrowRight size={17} />
              </a>
              <a className="button button-secondary" href="#build">See What You Can Build</a>
            </div>
            <div className="availability">
              <span><Check size={14} /> DevHub available now</span>
              <span>Marketplace coming soon</span>
            </div>
          </div>

          <div className="hero-art" aria-label="Autheo neighborhood ecosystem illustration">
            <img className="hero-day" src={heroDay} alt="" />
            <img className="hero-night" src={heroNight} alt="" />
            <div className="hero-caption">
              <span className="pulse-dot" />
              <div><strong>The neighborhood is taking shape.</strong><small>DevHub is where ideas begin.</small></div>
            </div>
          </div>
        </section>

        <section className="statement">
          <p>From your first website to your next big application,</p>
          <h2>Autheo DevHub helps you bring your ideas to life.</h2>
          <div className="statement-tags">
            <span>Build</span><i /><span>Deploy</span><i /><span>Manage</span><i /><span>Monitor</span>
          </div>
        </section>

        <section id="build" className="section use-cases" aria-labelledby="build-title">
          <div className="section-heading split-heading">
            <div>
              <p className="eyebrow">What you can build</p>
              <h2 id="build-title">Start with an idea.<br />Take it somewhere real.</h2>
            </div>
            <p>
              DevHub is the entry point to Autheo&apos;s decentralized cloud ecosystem, with
              approachable tools for supported projects and workloads.
            </p>
          </div>
          <div className="use-case-grid">
            {useCases.map(({ icon: Icon, ...item }) => (
              <article className="use-case-card" key={item.title}>
                <div className="card-top">
                  <span className="card-number">{item.number}</span>
                  <span className="feature-icon"><Icon size={23} /></span>
                </div>
                <span className={`status ${item.status === "In development" ? "status-development" : "status-available"}`}>
                  {item.status}
                </span>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
                <small>{item.detail}</small>
              </article>
            ))}
          </div>
        </section>

        <section id="how-it-works" className="section process" aria-labelledby="process-title">
          <div className="process-intro">
            <p className="eyebrow">How DevHub works</p>
            <h2 id="process-title">A clear path from code to cloud.</h2>
            <p>
              DevHub brings project creation, deployment, and day-to-day management together in
              one place. Production availability can vary by supported workload and infrastructure.
            </p>
            <div className="mini-console" aria-hidden="true">
              <div className="console-bar"><i /><i /><i /></div>
              <code><span>$</span> connect project</code>
              <code><span>$</span> build supported workload</code>
              <code><span>$</span> deploy to Autheo cloud</code>
              <code className="console-success"><Check size={13} /> deployment ready</code>
            </div>
          </div>
          <div className="steps">
            {steps.map(([number, title, copy]) => (
              <article className="step" key={number}>
                <span>{number}</span>
                <div><h3>{title}</h3><p>{copy}</p></div>
              </article>
            ))}
          </div>
        </section>

        <section id="getting-started" className="section beginner" aria-labelledby="beginner-title">
          <div className="beginner-art" aria-hidden="true">
            <div className="idea-orbit orbit-one" />
            <div className="idea-orbit orbit-two" />
            <Bot size={74} />
            <span className="idea-chip chip-one">&lt;/&gt;</span>
            <span className="idea-chip chip-two">idea</span>
            <span className="idea-chip chip-three">deploy</span>
          </div>
          <div className="beginner-copy">
            <span className="status status-available">Beginner friendly</span>
            <p className="eyebrow">Getting started</p>
            <h2 id="beginner-title">No Coding Experience? No Problem.</h2>
            <p className="lead">
              Want a website for your small business? Describe what you want to your favorite AI
              assistant, build your project, and let DevHub help you get it online.
            </p>
            <ol>
              <li><span>1</span> Start with an idea.</li>
              <li><span>2</span> Use your favorite AI assistant to help build it.</li>
              <li><span>3</span> Prepare your project for deployment.</li>
              <li><span>4</span> Use DevHub to deploy and manage supported workloads.</li>
            </ol>
            <p className="fine-print">
              AI coding assistants are third-party tools. DevHub currently deploys the project
              you create; it does not include an AI coding assistant.
            </p>
            <a className="button button-primary" href={siteConfig.devHubUrl}>
              Get Started with DevHub <ArrowRight size={17} />
            </a>
          </div>
        </section>

        <MarketplacePreview />

        <section className="closing">
          <div>
            <span className="closing-icon"><Activity size={22} /></span>
            <p className="eyebrow">Your next project starts here</p>
            <h2>Build It. Deploy It. Run It.</h2>
            <p>Bring your ideas to life with the tools available in Autheo DevHub today.</p>
          </div>
          <a className="button button-light" href={siteConfig.devHubUrl}>
            Launch DevHub <ArrowRight size={17} />
          </a>
        </section>
      </main>

      <footer>
        <a className="brand footer-brand" href="#home">
          <span className="brand-mark">A</span><span>autheo</span><small>DevHub</small>
        </a>
        <p>DevHub is available now. The Neighborhood Marketplace is coming soon.</p>
        <a href="#home">Back to top</a>
      </footer>
    </div>
  );
}
