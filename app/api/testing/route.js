const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;


export async function GET() {
  try {
    const response = await fetch(`${backendUrl}/`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch from backend. Status: ${response.status}`);
    }

    const data = await response.json();

    // ✅ MUST wrap your data in a Response
    return Response.json(data);
  } catch (err) {
    console.error("Error in /api/testing route:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}
