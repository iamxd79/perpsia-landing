"use client";

import { useEffect, useState } from "react";
import { usePrivy } from "@privy-io/react-auth";

export default function AccountPage() {
  if (!process.env.NEXT_PUBLIC_PRIVY_APP_ID) {
    return (
      <main className="account-link-shell">
        <section className="account-link-card">
          <span className="eyebrow">PERPSIA ACCOUNT</span>
          <h1>Authentication is being configured</h1>
          <p>The PerpsIA account dashboard will be available shortly.</p>
        </section>
      </main>
    );
  }
  return <AuthenticatedAccountPage />;
}

function AuthenticatedAccountPage() {
  const { ready, authenticated, getAccessToken, login, logout } = usePrivy();
  const [account, setAccount] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!ready || !authenticated) return;
    getAccessToken()
      .then((privyAccessToken) => fetch("/api/account/me", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ privyAccessToken }),
      }))
      .then(async (response) => ({ ok: response.ok, body: await response.json() }))
      .then(({ ok, body }) => ok ? setAccount(body) : setError(body?.error || "Could not load account."))
      .catch(() => setError("Could not load account."));
  }, [authenticated, getAccessToken, ready]);

  return (
    <main className="account-link-shell">
      <section className="account-link-card">
        <span className="eyebrow">PERPSIA ACCOUNT</span>
        <h1>Your intelligence workspace</h1>
        {!ready && <p>Loading secure authentication…</p>}
        {ready && !authenticated && (
          <>
            <p>Sign in with Privy to access your PerpsIA account.</p>
            <button className="account-link-button" type="button" onClick={login}>Continue with Privy</button>
          </>
        )}
        {authenticated && account && (
          <>
            <p>Your PerpsIA account is active and ready for the dashboard.</p>
            <div className="account-link-status">{account.identities?.length || 1} linked identity{account.identities?.length === 1 ? "" : "ies"}</div>
            <button className="account-link-secondary" type="button" onClick={logout}>Log out</button>
          </>
        )}
        {error && <p className="account-link-error">{error}</p>}
      </section>
    </main>
  );
}
