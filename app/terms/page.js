import SiteFooter from "../../components/site-footer";
import SiteHeader from "../../components/site-header";

export const metadata = { title: "Terms" };

export default function TermsPage() {
  return <div className="site-shell"><SiteHeader /><main className="legal-page"><p className="eyebrow">PerpsIA</p><h1>Terms</h1><p>PerpsIA provides market research and analytics for informational purposes. It does not provide investment advice or guarantee trading results.</p><p>You are responsible for your own decisions and for verifying market information before acting.</p></main><SiteFooter /></div>;
}
