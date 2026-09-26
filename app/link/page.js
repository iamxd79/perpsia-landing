import AccountLinkFlow from "../../components/account-link-flow";

export const metadata = {
  title: "Connect your PerpsIA account",
  description: "Securely connect your Telegram and PerpsIA web identities.",
  robots: { index: false, follow: false },
};

export default function LinkPage() {
  if (!process.env.NEXT_PUBLIC_PRIVY_APP_ID) {
    return (
      <main className="account-link-shell">
        <section className="account-link-card">
          <span className="eyebrow">PERPSIA ACCOUNT</span>
          <h1>Authentication is being configured</h1>
          <p>This account connection will be available shortly.</p>
        </section>
      </main>
    );
  }
  return <AccountLinkFlow />;
}
