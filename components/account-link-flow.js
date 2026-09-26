"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePrivy } from "@privy-io/react-auth";

const copy = {
  checking: ["Checking your secure link", "Validating the one-time Telegram connection…"],
  auth: ["Continue with PerpsIA", "Authenticate to connect this Telegram account to your PerpsIA account."],
  linking: ["Connecting your account", "Verifying your Privy session and linking your identities…"],
  success: ["Account connected", "Your Telegram and web identities now use the same PerpsIA account."],
  invalid: ["Link unavailable", "This link is invalid. Generate a new one from Telegram with /account."],
  expired: ["Link expired", "For your security, links expire after 10 minutes. Generate a new one from Telegram."],
  used: ["Link already used", "This connection link has already been completed. You can sign in normally now."],
  conflict: ["Account connection needs review", "This Privy identity is already connected to another PerpsIA account. No accounts were merged."],
  error: ["Connection unavailable", "We could not complete the connection. Please try again without closing this page."],
};

function messageFor(status) {
  return copy[status] || copy.error;
}

export default function AccountLinkFlow() {
  const { ready, authenticated, login, getAccessToken } = usePrivy();
  const [token] = useState(() => {
    if (typeof window === "undefined") return "";
    return new URLSearchParams(window.location.search).get("token") || sessionStorage.getItem("perpsia-link-token") || "";
  });
  const [status, setStatus] = useState("checking");
  const [detail, setDetail] = useState("");
  const consumed = useRef(false);

  useEffect(() => {
    if (token) {
      sessionStorage.setItem("perpsia-link-token", token);
      window.history.replaceState({}, "", "/link");
    }
  }, [token]);

  useEffect(() => {
    if (!token) return;
    let cancelled = false;
    fetch("/api/account/link", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "inspect", token }),
    })
      .then(async (response) => ({ ok: response.ok, body: await response.json() }))
      .then(({ ok, body }) => {
        if (cancelled) return;
        if (!ok) setStatus(body?.status || "invalid");
        else setStatus("auth");
      })
      .catch(() => !cancelled && setStatus("error"));
    return () => { cancelled = true; };
  }, [token]);

  useEffect(() => {
    if (!ready || !authenticated || status !== "auth" || !token || consumed.current) return;
    consumed.current = true;
    setStatus("linking");
    getAccessToken()
      .then((privyAccessToken) => fetch("/api/account/link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "consume", token, privyAccessToken }),
      }))
      .then(async (response) => ({ status: response.status, body: await response.json() }))
      .then(({ status: responseStatus, body }) => {
        sessionStorage.removeItem("perpsia-link-token");
        if (responseStatus === 200) {
          setStatus("success");
          setDetail("You can now open your PerpsIA dashboard with Privy.");
        } else if (responseStatus === 409 || body?.error === "account_conflict") setStatus("conflict");
        else if (responseStatus === 401) setStatus("error");
        else setStatus(body?.error || "error");
      })
      .catch(() => setStatus("error"));
  }, [authenticated, getAccessToken, ready, status, token]);

  const [title, description] = messageFor(status);
  const needsAuth = status === "auth" && ready && !authenticated;

  return (
    <main className="account-link-shell">
      <section className="account-link-card" aria-live="polite">
        <span className="eyebrow">PERPSIA ACCOUNT</span>
        <h1>{title}</h1>
        <p>{detail || description}</p>
        {!ready && <div className="account-link-status">Loading secure authentication…</div>}
        {needsAuth && (
          <button className="account-link-button" type="button" onClick={login}>
            Continue with Privy
          </button>
        )}
        {status === "success" && (
          <Link className="account-link-button" href="/account">Open account</Link>
        )}
        {status === "conflict" && (
          <Link className="account-link-secondary" href="/">Return to PerpsIA</Link>
        )}
        {status === "invalid" || status === "expired" || status === "used" ? (
          <a className="account-link-secondary" href="https://t.me/perpsia_bot">Open Telegram</a>
        ) : null}
      </section>
    </main>
  );
}
