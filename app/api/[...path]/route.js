import { NextResponse } from "next/server";

export async function GET(request) {
    console.log("🔍 [Catch-All GET] hit:", request.url);
    return NextResponse.json({
        error: "404 Not Found in Catch-All",
        path: request.url
    }, { status: 404 });
}

export async function POST(request) {
    console.log("🔍 [Catch-All POST] hit:", request.url);
    return NextResponse.json({
        error: "404 Not Found in Catch-All",
        path: request.url
    }, { status: 404 });
}
