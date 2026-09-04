import Image from "next/image";
import Link from "next/link";
import ThemeToggle from "./theme-toggle";

const botUrl = "https://t.me/perpsia_bot";

export default function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link className="brand" href="/" aria-label="PerpsIA home">
          <Image src="/images/perpsia-logo.svg" alt="" width={36} height={36} priority />
          <span>PerpsIA</span>
        </Link>
        <nav className="site-nav" aria-label="Primary navigation">
          <Link href="/signals">Signals</Link>
          <Link href="/#how-it-works">How It Works</Link>
          <Link href="/#early-alpha">Early Alpha</Link>
          <Link href="/#performance">Performance</Link>
          <a href={botUrl} target="_blank" rel="noopener noreferrer">Telegram</a>
        </nav>
        <div className="header-actions">
          <ThemeToggle />
          <a className="button button-small" href={botUrl} target="_blank" rel="noopener noreferrer">Launch PerpsIA</a>
        </div>
      </div>
    </header>
  );
}
