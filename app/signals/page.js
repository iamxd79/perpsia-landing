import SignalsBoard from "../../components/signals-board";
import SiteFooter from "../../components/site-footer";
import SiteHeader from "../../components/site-header";
import PaperTradingPanel from "../../components/paper-trading-panel";

export const metadata = {
  title: "Live Perp Signals",
  description: "View live PerpsIA perpetual futures signals, scores, confidence, lifecycle changes, and risk levels.",
  alternates: { canonical: "/signals" },
  openGraph: {
    title: "Live Perp Signals — PerpsIA",
    description: "View live PerpsIA perpetual futures signals, scores, confidence, lifecycle changes, and risk levels.",
    url: "/signals",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Live Perp Signals — PerpsIA",
    description: "View live PerpsIA perpetual futures signals, scores, confidence, lifecycle changes, and risk levels.",
    images: ["/twitter-image.png"],
  },
};

export default function SignalsPage() {
  return (
    <div className="site-shell">
      <SiteHeader />
      <main className="signals-page">
        <section className="signals-hero">
          <p className="eyebrow">PerpsIA Signal Feed</p>
          <h1>Live Signals</h1>
          <p>Real PerpsIA setups, scored and tracked as market conditions change.</p>
        </section>
        <section className="signals-content"><SignalsBoard /></section>
        <PaperTradingPanel compact />
      </main>
      <SiteFooter />
    </div>
  );
}
