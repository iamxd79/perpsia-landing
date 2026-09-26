import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const apiBaseUrl = (process.env.PERPSIA_API_BASE_URL || "https://perpsia.onrender.com").replace(/\/$/, "");
const internalToken = process.env.PERPSIA_API_TOKEN || process.env.PERPSIA_INTERNAL_API_TOKEN;

function upstreamHeaders() {
  return {
    "Content-Type": "application/json",
    ...(internalToken ? { Authorization: `Bearer ${internalToken}` } : {}),
  };
}

export async function POST(request) {
  if (!internalToken) {
    return NextResponse.json({ error: "Account linking is not configured." }, { status: 503 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const action = body?.action === "consume" ? "consume" : "inspect";
  const payload = action === "consume"
    ? { token: body?.token, privyAccessToken: body?.privyAccessToken }
    : { token: body?.token };

  try {
    const response = await fetch(`${apiBaseUrl}/api/account/link/${action}`, {
      method: "POST",
      headers: upstreamHeaders(),
      body: JSON.stringify(payload),
      cache: "no-store",
      signal: AbortSignal.timeout(8000),
    });
    const result = await response.json().catch(() => ({ error: "Account service returned an invalid response." }));
    return NextResponse.json(result, { status: response.status });
  } catch {
    return NextResponse.json({ error: "Account service is temporarily unavailable." }, { status: 503 });
  }
}
