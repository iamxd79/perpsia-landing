"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import {
  Activity,
  ArrowDown,
  ArrowUp,
  BrainCircuit,
  ChartNoAxesCombined,
  Database,
  Eye,
  Moon,
  Radar,
  ScanSearch,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Sun,
  Terminal,
  Zap,
} from "lucide-react";

const botUrl = "https://t.me/perpsia_bot";

const agentFlow = [
  {
    number: "01",
    title: "Scan",
    text: "Search perpetual futures markets for assets and conditions worth investigating.",
    icon: Radar,
  },
  {
    number: "02",
    title: "Analyze",
    text: "Study market structure, funding, open interest, positioning, and momentum.",
    icon: ChartNoAxesCombined,
  },
  {
    number: "03",
    title: "Challenge",
    text: "Look for conflicting data and reasons the initial market view could fail.",
    icon: ShieldAlert,
  },
  {
    number: "04",
    title: "Track",
    text: "Compare fresh market conditions with previous research and active setups.",
    icon: Activity,
  },
  {
    number: "05",
    title: "Explain",
    text: "Turn complex market data into clear and structured intelligence.",
    icon: BrainCircuit,
  },
];

const capabilities = [
  {
    number: "01",
    title: "Market Discovery",
    text: "Scans perpetual futures markets to find assets and conditions worth deeper investigation.",
    icon: ScanSearch,
  },
  {
    number: "02",
    title: "Decision Engine",
    text: "Research is scored, challenged, and classified before Perpsia returns a market view.",
    icon: ChartNoAxesCombined,
  },
  {
    number: "03",
    title: "Memory Layer",
    text: "Fresh market data is compared with previous research to identify meaningful changes over time.",
    icon: Database,
  },
  {
    number: "04",
    title: "Reasoning Layer",
    text: "Explains the evidence, conflicting signals, current view, and what could change that view.",
    icon: BrainCircuit,
  },
];

const intelligenceStats = [
  {
    value: "24/7",
    label: "Market monitoring",
  },
  {
    value: "5",
    label: "Intelligence stages",
  },
  {
    value: "4H",
    label: "Autonomous scan cycle",
  },
  {
    value: "CMC",
    label: "Skill Hub powered",
  },
];

export default function Home() {
  const [navVisible, setNavVisible] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 80) {
        setNavVisible(true);
      } else {
        setNavVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <main className={`site-shell ${darkMode ? "dark-mode" : ""}`}>
      <div className="hero-background" />

      <nav
        className={`navbar ${
          navVisible ? "navbar-visible" : "navbar-hidden"
        }`}
      >
        <a className="brand" href="#top">
          <Image
            src="/images/perpsia-logo.svg"
            alt="Perpsia"
            width={36}
            height={36}
            priority
          />

          <span>PERPSIA TERMINAL</span>
        </a>

        <div className="nav-links">
          <a href="#about">About</a>
          <a href="#system">System</a>
          <a href="#terminal">Terminal</a>
          <a href="#intelligence">Intelligence</a>
        </div>

        <a
          className="nav-cta"
          href={botUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Launch Terminal
        </a>
      </nav>

      <section className="hero" id="top">
        <div className="hero-content">
          <div className="hero-title">
            <span className="hero-title-clean">Welcome to</span>

            <h1>
              Perpsia Terminal
              <span className="terminal-cursor">_</span>
            </h1>
          </div>

          <p className="hero-description">
            Autonomous perpetual futures market intelligence powered by
            CoinMarketCap Skills Hub.
          </p>

          <p className="hero-secondary">
            Scan markets. Analyze assets. Challenge setups. Track changes.
            Understand what matters.
          </p>

          <div className="hero-actions">
            <a
              className="primary-btn"
              href={botUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Terminal size={17} />
              Launch Terminal
            </a>

            <a className="secondary-btn" href="#system">
              Explore the System
            </a>
          </div>

          <a
            className="orynth-badge"
            href="https://orynth.dev/projects/perpsia"
            target="_blank"
            rel="noopener"
          >
            <img
              src="https://orynth.dev/api/badge/perpsia?theme=dark&style=default"
              alt="Featured on Orynth"
              width="260"
              height="80"
            />
          </a>

          <div className="hero-status">
            <span>PERPSIA AGENT ONLINE</span>
            <span className="status-divider" />
            <span>CMC SKILLS HUB READY</span>
            <span className="status-divider" />
            <span>AUTONOMOUS SCANNING ACTIVE</span>
          </div>
        </div>

        <div className="hero-mascot-visual">
          <Image
            src="/images/hero-mascot.png"
            alt="Perpsia AI mascot sitting on CoinMarketCap logo"
            width={1200}
            height={1200}
            priority
            className="hero-mascot-image"
          />
        </div>
      </section>

      <div className="hero-transition" />

      <section className="cmc-section" id="about">
        <div className="section-light section-light-one" />

        <div className="cmc-content">
          <div className="section-heading">
            <p className="section-kicker">THE INTELLIGENCE SOURCE</p>

            <h2>
              Powered by
              <br />
              <span>CMC Skills Hub.</span>
            </h2>
          </div>

          <div className="cmc-description">
            <p>
              Perpsia connects directly to CoinMarketCap Skills Hub to access
              specialized crypto market research capabilities.
            </p>

            <p>
              Instead of producing a quick answer from a single signal, Perpsia
              runs market research, processes the results through its own
              intelligence system, and returns a structured market view.
            </p>
          </div>
        </div>

        <div className="intelligence-stats">
          {intelligenceStats.map((stat) => (
            <div className="stat-item" key={stat.label}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="purpose-section">
        <div className="purpose-intro">
          <p className="section-kicker">BUILT FOR MARKET INTELLIGENCE</p>

          <h2>
            More than answers.
            <br />
            <span>A system that investigates.</span>
          </h2>
        </div>

        <div className="purpose-content">
          <div className="purpose-main">
            <Eye size={28} />

            <h3>Watch the market differently.</h3>

            <p>
              Perpsia is designed to investigate perpetual futures markets,
              identify meaningful conditions, challenge its own conclusions,
              and track how a market view changes over time.
            </p>
          </div>

          <div className="purpose-details">
            <div>
              <span>01 / DISCOVER</span>
              <p>
                Find assets and market conditions that deserve deeper research.
              </p>
            </div>

            <div>
              <span>02 / INVESTIGATE</span>
              <p>
                Use specialized CoinMarketCap market intelligence before forming
                a view.
              </p>
            </div>

            <div>
              <span>03 / MONITOR</span>
              <p>
                Track meaningful market changes instead of repeating the same
                analysis.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="flow-section" id="system">
        <div className="flow-background-light" />

        <div className="section-heading flow-heading">
          <p className="section-kicker">AGENT ARCHITECTURE</p>

          <h2>
            How Perpsia
            <span> thinks.</span>
          </h2>

          <p>
            Every market request moves through an intelligence pipeline built to
            research, challenge, track, and explain.
          </p>
        </div>

        <div className="flow-system">
          <div className="flow-energy-line">
            <span />
          </div>

          {agentFlow.map((item) => {
            const Icon = item.icon;

            return (
              <article className="flow-node" key={item.title}>
                <div className="flow-number">{item.number}</div>

                <div className="flow-icon-shell">
                  <div className="flow-icon-inner">
                    <Icon />
                  </div>
                </div>

                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="terminal-section" id="terminal">
        <div className="terminal-atmosphere" />

        <div className="terminal-copy">
          <p className="section-kicker">INSIDE THE TERMINAL</p>

          <h2>
            Market intelligence,
            <span> inside Telegram.</span>
          </h2>

          <p className="terminal-description">
            No complex dashboard required. Talk naturally to Perpsia, request
            market research, analyze an asset, or define your personal risk
            profile.
          </p>

          <div className="terminal-commands">
            <div>
              <Terminal size={15} />
              <code>Scan the market</code>
            </div>

            <div>
              <Terminal size={15} />
              <code>Analyze BTC</code>
            </div>

            <div>
              <Terminal size={15} />
              <code>Find perpetual futures opportunities</code>
            </div>

            <div>
              <Terminal size={15} />
              <code>I have $500, risk 1%, max leverage 5x</code>
            </div>
          </div>

          <a
            className="primary-btn"
            href={botUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Open Perpsia on Telegram
          </a>
        </div>

        <div className="terminal-visual">
          <div className="visual-orbit orbit-one" />
          <div className="visual-orbit orbit-two" />

          <div className="floating-data floating-data-one">
            <Activity size={15} />
            <span>MARKET ACTIVE</span>
          </div>

          <div className="floating-data floating-data-two">
            <BrainCircuit size={15} />
            <span>RESEARCH READY</span>
          </div>

          <Image
            src="/images/telegram-mockup.png"
            alt="Perpsia Telegram Terminal"
            width={1600}
            height={1600}
            className="phone-mockup"
          />
        </div>
      </section>

      <section className="intelligence-section" id="intelligence">
        <div className="intelligence-header">
          <div>
            <p className="section-kicker">PERPSIA INTELLIGENCE SYSTEM</p>

            <h2>
              Built as an agent.
              <span> Not a signal feed.</span>
            </h2>
          </div>

          <p>
            Perpsia combines market discovery, structured decision logic,
            memory, and reasoning to create a more complete research process.
          </p>
        </div>

        <div className="intelligence-layout">
          <div className="intelligence-modules">
            {capabilities.map((item) => {
              const Icon = item.icon;

              return (
                <article className="intelligence-module" key={item.title}>
                  <div className="module-index">{item.number}</div>

                  <div className="module-icon">
                    <Icon />
                  </div>

                  <div className="module-content">
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="intelligence-visual">
            <Image
              src="/images/intelligence-core.png"
              alt="Perpsia Intelligence Core"
              width={1600}
              height={1200}
              className="intelligence-core-image"
            />
          </div>
        </div>
      </section>

      <section className="monitoring-section">
        <div className="monitoring-header">
          <p className="section-kicker">CONTINUOUS INTELLIGENCE</p>

          <h2>
            The research does not have to stop after one answer.
          </h2>
        </div>

        <div className="monitoring-grid">
          <article>
            <div className="monitoring-icon">
              <Zap />
            </div>

            <span>01</span>

            <h3>Autonomous Scanning</h3>

            <p>
              Perpsia scans the market on a recurring cycle to look for new
              conditions and potential opportunities.
            </p>
          </article>

          <article>
            <div className="monitoring-icon">
              <Activity />
            </div>

            <span>02</span>

            <h3>Setup Tracking</h3>

            <p>
              Market conditions change. Perpsia compares fresh research with
              previous analysis to identify meaningful updates.
            </p>
          </article>

          <article>
            <div className="monitoring-icon">
              <ShieldCheck />
            </div>

            <span>03</span>

            <h3>Risk-Aware Research</h3>

            <p>
              Define capital, risk percentage, and maximum leverage to add
              personal constraints to the research process.
            </p>
          </article>
        </div>
      </section>

      <section className="beta-wrapper" id="beta">
        <div className="beta-section">
          <div className="beta-light" />

          <div className="beta-content">
            <p className="section-kicker">PRIVATE BETA</p>

            <h2>
              The terminal
              <span> is live.</span>
            </h2>

            <p>
              Perpsia is currently in private beta. Explore the agent, test the
              market intelligence workflow, and help shape what comes next.
            </p>

            <a
              className="primary-btn"
              href={botUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Sparkles size={17} />
              Join the Private Beta
            </a>
          </div>

          <div className="beta-visual">
            <Image
              src="/images/beta-illustration.png"
              alt="Perpsia Private Beta"
              width={1200}
              height={1200}
            />
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-background" />

        <div className="footer-content">
          <div className="footer-brand">
            <Image
              src="/images/perpsia-logo.svg"
              alt="Perpsia"
              width={42}
              height={42}
            />

            <span>PERPSIA TERMINAL</span>
          </div>

          <h2>
            Let the agent
            <br />
            watch the market.
          </h2>

          <div className="footer-bottom">
            <p>
              AUTONOMOUS PERPETUAL FUTURES MARKET INTELLIGENCE POWERED BY
              COINMARKETCAP SKILLS HUB.
            </p>

            <p>MARKET INTELLIGENCE ONLY. NOT FINANCIAL ADVICE.</p>
          </div>
        </div>
      </footer>

      <div className="floating-controls">
        <button
          type="button"
          className="floating-control-btn"
          onClick={() => setDarkMode((current) => !current)}
          aria-label={
            darkMode ? "Use transparent background" : "Use dark background"
          }
          title={darkMode ? "Transparent background" : "Dark background"}
        >
          {darkMode ? <Sun size={17} /> : <Moon size={17} />}
        </button>

        <button
          type="button"
          className="floating-control-btn"
          onClick={scrollToTop}
          aria-label="Scroll to top"
          title="Scroll to top"
        >
          <ArrowUp size={17} />
        </button>

        <button
          type="button"
          className="floating-control-btn"
          onClick={scrollToBottom}
          aria-label="Scroll to bottom"
          title="Scroll to bottom"
        >
          <ArrowDown size={17} />
        </button>
      </div>
    </main>
  );
}
