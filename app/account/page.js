"use client";

import { useEffect, useMemo, useState } from "react";
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
  const { ready, authenticated, user, getAccessToken, login, logout, connectWallet } = usePrivy();
  const [account, setAccount] = useState(null);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const linkedWallets = useMemo(() => (user?.linkedAccounts || []).filter((item) => item?.type === "wallet" || item?.type === "smart_wallet"), [user]);

  useEffect(() => {
    if (!ready || !authenticated) return;
    getAccessToken()
      .then((privyAccessToken) => fetch("/api/account/overview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ privyAccessToken }),
      }))
      .then(async (response) => ({ ok: response.ok, body: await response.json() }))
      .then(({ ok, body }) => ok ? setAccount(body) : setError(body?.error || "Could not load account."))
      .catch(() => setError("Could not load account."));
  }, [authenticated, getAccessToken, ready]);

  useEffect(() => {
    const wallet = linkedWallets[0];
    if (!authenticated || !account || !wallet?.address || (account.wallets || []).some((item) => item.address?.toLowerCase() === wallet.address.toLowerCase())) return;
    let cancelled = false;
    getAccessToken().then((privyAccessToken) => fetch("/api/account/wallets", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "link", privyAccessToken, wallet: { address: wallet.address, chain: { namespace: wallet.chainType === "solana" ? "solana" : "eip155", id: "1" } } }) }))
      .then(async (response) => ({ ok: response.ok, body: await response.json() }))
      .then(({ ok, body }) => { if (!cancelled && ok) setAccount((current) => ({ ...current, wallets: body.wallets })); })
      .catch(() => {});
    return () => { cancelled = true; };
  }, [account, authenticated, getAccessToken, linkedWallets]);

  async function updatePreferences(preferences) {
    setSaving(true); setError("");
    try {
      const privyAccessToken = await getAccessToken();
      const response = await fetch("/api/account/preferences", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ privyAccessToken, preferences }) });
      const body = await response.json();
      if (!response.ok) throw new Error(body?.error || "Could not save preference.");
      setAccount((current) => ({ ...current, ...body }));
    } catch (reason) { setError(reason.message); } finally { setSaving(false); }
  }

  async function saveRisk(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setSaving(true); setError("");
    try {
      const privyAccessToken = await getAccessToken();
      const response = await fetch("/api/account/risk", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ privyAccessToken, risk: { capital: form.get("capital"), riskPercent: form.get("riskPercent"), maxLeverage: form.get("maxLeverage") } }) });
      const body = await response.json();
      if (!response.ok) throw new Error(body?.error || "Could not save risk profile.");
      setAccount((current) => ({ ...current, ...body }));
    } catch (reason) { setError(reason.message); } finally { setSaving(false); }
  }

  async function connectAndSyncWallet() {
    setError("");
    try {
      await connectWallet();
      await new Promise((resolve) => setTimeout(resolve, 800));
      const wallet = linkedWallets[0];
      if (!wallet?.address) return;
      const privyAccessToken = await getAccessToken();
      const response = await fetch("/api/account/wallets", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "link", privyAccessToken, wallet: { address: wallet.address, chain: { namespace: wallet.chainType === "solana" ? "solana" : "eip155", id: "1" } } }) });
      const body = await response.json();
      if (!response.ok) throw new Error(body?.error || "Could not link wallet.");
      setAccount((current) => ({ ...current, wallets: body.wallets }));
    } catch (reason) { setError(reason.message); }
  }

  async function mutateWallet(action, walletId) {
    setSaving(true); setError("");
    try {
      const privyAccessToken = await getAccessToken();
      const response = await fetch("/api/account/wallets", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action, walletId, privyAccessToken }) });
      const body = await response.json();
      if (!response.ok) throw new Error(body?.error || "Could not update wallet.");
      setAccount((current) => ({ ...current, wallets: body.wallets }));
    } catch (reason) { setError(reason.message); } finally { setSaving(false); }
  }

  return (
    <main className="account-dashboard-shell">
      <section className="account-dashboard-hero"><span className="eyebrow">PERPSIA ACCOUNT</span><h1>Your intelligence workspace</h1><p>One account for Telegram, Privy, wallets, watchlists, risk and future PerpsIA entitlements.</p><button className="account-link-secondary" type="button" onClick={logout}>Log out</button></section>
      {!ready && <p className="account-link-status">Loading secure authentication…</p>}
      {ready && !authenticated && <section className="account-dashboard-card"><h2>Connect to PerpsIA</h2><p>Sign in with Privy to open your unified account.</p><button className="account-link-button" type="button" onClick={login}>Continue with Privy</button></section>}
      {authenticated && account && <div className="account-dashboard-grid">
        <section className="account-dashboard-card"><span className="eyebrow">ACCOUNT</span><h2>Connected</h2><p>Created {account.account?.created_at ? new Date(account.account.created_at).toLocaleDateString() : "Recently"}</p><div className="account-dashboard-pills">{(account.identities || []).map((identity) => <span key={identity.provider}>{identity.provider}</span>)}</div></section>
        <section className="account-dashboard-card"><span className="eyebrow">CONNECTIONS</span><h2>Identity network</h2><p>Telegram and Privy resolve to this same PerpsIA account.</p><div className="account-dashboard-pills">{(account.identities || []).map((identity) => <span key={identity.provider}>{identity.provider} connected</span>)}</div></section>
        <section className="account-dashboard-card account-dashboard-wide"><span className="eyebrow">WALLETS</span><h2>Wallet identity</h2><p>Only wallets verified by Privy can be linked.</p><div className="account-dashboard-list">{(account.wallets || []).length ? account.wallets.map((wallet) => <div className="account-dashboard-row" key={wallet.walletId}><span>{wallet.address.slice(0, 8)}…{wallet.address.slice(-6)}<small>{wallet.chain.namespace}:{wallet.chain.id} · {wallet.custody}</small></span><span className="account-dashboard-wallet-actions"><b>{wallet.isPrimary ? "Primary" : "Connected"}</b>{!wallet.isPrimary && <button type="button" onClick={() => mutateWallet("set_primary", wallet.walletId)}>Make primary</button>}<button type="button" onClick={() => mutateWallet("unlink", wallet.walletId)}>Disconnect</button></span></div>) : <p>No wallet connected yet.</p>}</div><button className="account-link-button" type="button" onClick={connectAndSyncWallet}>Connect wallet</button></section>
        <section className="account-dashboard-card"><span className="eyebrow">TRADING PREFERENCES</span><h2>Shared settings</h2><label>Preferred venue<select value={account.preferences?.preferred_exchange || "Binance"} onChange={(event) => updatePreferences({ preferred_exchange: event.target.value })}><option>Binance</option><option>Bybit</option><option>OKX</option><option>Hyperliquid</option></select></label><label>Alert frequency<select value={account.preferences?.alert_frequency || "4h"} onChange={(event) => updatePreferences({ alert_frequency: event.target.value })}><option>1h</option><option>4h</option><option>12h</option></select></label><label>Signal sensitivity<select value={account.preferences?.signal_sensitivity || "balanced"} onChange={(event) => updatePreferences({ signal_sensitivity: event.target.value })}><option>conservative</option><option>balanced</option><option>aggressive</option></select></label></section>
        <section className="account-dashboard-card"><span className="eyebrow">RISK PROFILE</span><h2>Risk controls</h2><form onSubmit={saveRisk}><label>Capital<input name="capital" type="number" min="1" defaultValue={account.risk?.capital || ""} placeholder="1000" required /></label><label>Risk per trade %<input name="riskPercent" type="number" min="0.01" step="0.01" defaultValue={account.risk?.risk_percent || ""} placeholder="1" required /></label><label>Maximum leverage<input name="maxLeverage" type="number" min="1" step="0.1" defaultValue={account.risk?.max_leverage || ""} placeholder="5" required /></label><button className="account-link-button" type="submit" disabled={saving}>Save risk profile</button></form></section>
        <section className="account-dashboard-card account-dashboard-wide"><span className="eyebrow">ACTIVITY</span><h2>Recent analyses</h2><div className="account-dashboard-list">{(account.analyses || []).length ? account.analyses.slice(0, 8).map((item) => <div className="account-dashboard-row" key={item.analysis_id}><span><b>${item.symbol}</b><small>{item.analysis_type} · {item.request_source} · {new Date(item.created_at).toLocaleString()}</small></span><b>{item.venue || "Market"}</b></div>) : <p>No account activity yet. Run an analysis from Telegram to build your history.</p>}</div></section>
        <section className="account-dashboard-card account-dashboard-wide"><span className="eyebrow">WATCHLIST</span><h2>Tracked assets</h2><div className="account-dashboard-pills">{(account.watchlist || []).length ? account.watchlist.map((item) => <span key={item.symbol}>{item.symbol}</span>) : <span>No tracked assets yet</span>}</div><p>Changes made through Telegram and this dashboard resolve to the same account-owned watchlist.</p></section>
      </div>}
      {saving && <p className="account-link-status">Saving account changes…</p>}
      {error && <p className="account-link-error">{error}</p>}
    </main>
  );
}
