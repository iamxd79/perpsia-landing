import SiteFooter from "../../components/site-footer";
import SiteHeader from "../../components/site-header";

export const metadata = { title: "Privacy" };

export default function PrivacyPage() {
  return <div className="site-shell"><SiteHeader /><main className="legal-page"><p className="eyebrow">PerpsIA</p><h1>Privacy</h1><p>PerpsIA does not sell personal information. Service providers may process limited technical information needed to operate the website and Telegram service.</p><p>Do not send private keys, passwords, or other sensitive credentials to PerpsIA.</p></main><SiteFooter /></div>;
}
