import { NextRequest, NextResponse } from 'next/server';

export async function POST(
  request: NextRequest,
  context: { params: { customerId: string; couponCode: string } }
) {
  try {
    const { customerId, couponCode } = await context.params;

    // 🟡 Call your backend with the correct URL structure (including couponCode)
    const response = await fetch(
      `http://localhost:4000/api/booking/customers/${customerId}/validate-coupon`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerId,
          couponCode,
          expertId: '68c94094d011cdb0e5fa2caa', // adjust as needed
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
        ...backendResult, // spread backend response for direct access
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('❌ API route error:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
