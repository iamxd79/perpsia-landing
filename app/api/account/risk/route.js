import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
const apiBaseUrl = (process.env.PERPSIA_API_BASE_URL || "https://perpsia.onrender.com").replace(/\/$/, "");
const internalToken = process.env.PERPSIA_API_TOKEN || process.env.PERPSIA_INTERNAL_API_TOKEN;

export async function POST(request) {
  if (!internalToken) return NextResponse.json({ error: "Account service is not configured." }, { status: 503 });
  let body;
  try { body = await request.json(); } catch { return NextResponse.json({ error: "Invalid request." }, { status: 400 }); }
  if (!body?.privyAccessToken) return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  try {
    const response = await fetch(`${apiBaseUrl}/api/account/risk`, { method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${internalToken}` }, body: JSON.stringify(body), cache: "no-store", signal: AbortSignal.timeout(8000) });
    return NextResponse.json(await response.json().catch(() => ({ error: "Invalid account response." })), { status: response.status });
  } catch { return NextResponse.json({ error: "Account service is temporarily unavailable." }, { status: 503 }); }
}
