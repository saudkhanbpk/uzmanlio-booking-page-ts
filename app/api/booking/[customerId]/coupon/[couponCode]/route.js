import { NextResponse } from "next/server";
const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function POST(request, context) {
  try {
    const { customerId, couponCode } = context.params;

    // 🟡 Call your backend
    const response = await fetch(
      `${backendUrl}/${customerId}/validate-coupon`,
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
          expertId: "68c94094d011cdb0e5fa2caa", // adjust as needed
        }),
      }
    );

    if (!response.ok) {
      const backendError = await response.json().catch(() => null);
      return NextResponse.json(
        backendError || { error: "Backend responded with error" },
        { status: response.status }
      );
    }

    // 🟢 Parse backend response
    const backendResult = await response.json();

    // 🟢 Return combined result to frontend
    return NextResponse.json(
      {
        success: true,
        customerId,
        couponCode,
        ...backendResult,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ API route error:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
