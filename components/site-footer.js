import Image from "next/image";
import Link from "next/link";

const botUrl = "https://t.me/perpsia_bot";
const githubUrl = "https://github.com/iamxd79/Perpsia";

export default function SiteFooter() {
  return (
    <footer className="site-footer" id="disclaimer">
      <div className="site-footer-main">
        <div className="footer-brand">
          <Image src="/images/perpsia-logo.svg" alt="" width={34} height={34} />
          <span>PerpsIA</span>
        </div>
        <p>PerpsIA provides market research and analytics. It does not guarantee trading results.</p>
        <p>Some trading links may be affiliate links.</p>
      </div>
      <nav aria-label="Footer navigation">
        <a href={botUrl} target="_blank" rel="noopener noreferrer">Telegram</a>
        <a href={githubUrl} target="_blank" rel="noopener noreferrer">GitHub</a>
        <Link href="/terms">Terms</Link>
        <Link href="/privacy">Privacy</Link>
      </nav>
    </footer>
  );
}
