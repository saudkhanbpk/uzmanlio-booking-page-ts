import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const logFile = path.resolve(process.cwd(), "api_debug.log");
const log = (msg) => {
  const line = `[${new Date().toISOString()}] ${msg}\n`;
  try {
    fs.appendFileSync(logFile, line);
  } catch (e) { }
  console.log(msg);
};

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function GET(request, context) {
  log("🚀 [Next.js API] Coupon validation GET hit");
  return NextResponse.json({ message: "Coupon API is reachable via GET" });
}

export async function POST(request, context) {
  log("🚀 [Next.js API] Coupon validation request received");
  try {
    // Next.js 15+ requires awaiting params
    const params = await context.params;
    const { customerId, couponCode } = params;

    log(`📦 [Next.js API] Params - customerId: ${customerId}, couponCode: ${couponCode}`);

    const { searchParams } = new URL(request.url);
    const expertIdFromQuery = searchParams.get('expertId');

    // Try to get expertId from body, otherwise from query params
    let expertId = expertIdFromQuery;
    try {
      const clonedRequest = request.clone();
      const body = await clonedRequest.json();
      log(`📨 [Next.js API] Request body: ${JSON.stringify(body)}`);
      if (body?.expertId) {
        expertId = body.expertId;
      }
    } catch (e) {
      log(`ℹ️ [Next.js API] Could not parse body or body empty, using expertId from query: ${expertId}`);
    }

    if (!expertId) {
      log("❌ [Next.js API] expertId is missing!");
      return NextResponse.json(
        { error: "expertId is required" },
        { status: 400 }
      );
    }

    const fullBackendUrl = `${backendUrl}/${customerId}/validate-coupon`;
    log(`🔗 [Next.js API] Forwarding to backend: ${fullBackendUrl}`);
    log(`📡 [Next.js API] Payload: ${JSON.stringify({ customerId, couponCode, expertId })}`);

    // Call your backend
    const response = await fetch(
      fullBackendUrl,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": request.headers.get('X-CSRF-Token')
        },
        credentials: "include",
        body: JSON.stringify({
          customerId,
          couponCode,
          expertId,
        }),
      }
    );

    log(`📥 [Next.js API] Backend response status: ${response.status}`);

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      log(`❌ [Next.js API] Backend error: ${JSON.stringify(data)}`);
      return NextResponse.json(
        data || { error: "Backend responded with error" },
        { status: response.status }
      );
    }

    log(`✅ [Next.js API] Backend result: ${JSON.stringify(data)}`);

    // Return combined result to frontend
    return NextResponse.json(
      {
        success: true,
        customerId,
        couponCode,
        ...data,
      },
      { status: 200 }
    );
  } catch (error) {
    log(`💥 [Next.js API] API route error: ${error.message}`);
    return NextResponse.json(
      {
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
