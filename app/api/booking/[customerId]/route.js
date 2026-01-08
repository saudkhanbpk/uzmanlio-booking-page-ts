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
// import { useParams } from "next/navigation";
// const params = useParams();

/**
 * Handles booking creation (proxy to backend)
 */
export async function POST(request, context) {
  log(`📡 [Parent API] Received request at ${request.url}`);
  try {
    // Next.js 15+ requires awaiting params
    const params = await context.params;
    const customerId = params.customerId;
    log(`🌳 [Parent API] Received customerId: ${customerId}`);

    // ✅ Parse incoming form data
    const formData = await request.formData();
    const bookingDataString = formData.get("bookingData");

    if (!bookingDataString) {
      return NextResponse.json({ error: "Booking data is required" }, { status: 400 });
    }

    // ✅ Parse booking JSON
    let bookingData;
    try {
      bookingData = JSON.parse(bookingDataString);
    } catch {
      return NextResponse.json({ error: "Invalid booking data format" }, { status: 400 });
    }

    // ✅ Generate or reuse customer ID
    const finalCustomerId = customerId;
    // bookingData.customerId ||
    // customerId ||
    // crypto.randomUUID?.() ||
    // Math.random().toString(36).substring(2, 15);

    // ✅ Extract uploaded files
    const files = formData.getAll("files");
    console.log(`📎 ${files.length} file(s) received`);
    files.forEach((f, i) =>
      console.log(`  File ${i + 1}: ${f.name} (${f.size} bytes, ${f.type})`)
    );

    // ✅ Prepare FormData for backend
    const backendFormData = new FormData();
    backendFormData.append(
      "bookingData",
      JSON.stringify({
        ...bookingData,
        customerId: finalCustomerId,
        timestamp: new Date().toISOString(),
        // expertId: params.expertID,
      })
    );

    for (const file of files) {
      backendFormData.append("files", file, file.name);
    }

    // 🧾 Debug log (optional in dev mode)
    if (process.env.NODE_ENV === "development") {
      console.log("📦 Sending to backend:");
      for (const [key, value] of backendFormData.entries()) {
        if (value instanceof File) {
          console.log(`  ${key}: File(${value.name}, ${value.size} bytes)`);
        } else {
          console.log(`  ${key}: ${value}`);
        }
      }
    }

    // ✅ Use environment variable for backend URL
    const backendUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/${finalCustomerId}/form`;


    const backendResponse = await fetch(backendUrl, {
      method: "POST",
      body: backendFormData,
      headers: {
        'X-CSRF-Token': request.headers.get('X-CSRF-Token')
      },
      credentials: 'include'
    });

    // ✅ Handle backend errors gracefully
    if (!backendResponse.ok) {
      console.log("Backend response:", backendResponse)
      const errorData = await backendResponse.json().catch(() => ({}));
      console.error("❌ Backend error:", errorData);

      return NextResponse.json(
        {
          error: errorData.message || "Failed to create booking",
          details: errorData,
        },
        { status: backendResponse.status }
      );
    }

    const result = await backendResponse.json();
    console.log("✅ Booking created successfully:", result);

    return NextResponse.json(
      {
        success: true,
        bookingId: result.bookingId || finalCustomerId,
        customerId: finalCustomerId,
        message: "Booking created successfully",
        filesUploaded: files.length,
        data: result,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ API route error:", error);

    return NextResponse.json(
      {
        error: "Internal server error",
        message:
          error instanceof Error ? error.message : "An unexpected error occurred",
      },
      { status: 500 }
    );
  }
}

/**
 * Handle disallowed methods (GET, PUT, DELETE, etc.)
 */
export async function GET(request, context) {
  const params = await context.params;
  console.log("📡 [Parent API] GET hit for customerId:", params.customerId);
  return NextResponse.json({ message: "Parent Booking API is working", customerId: params.customerId });
}
