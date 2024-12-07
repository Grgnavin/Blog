import { NextResponse } from "next/server";

export async function GET() {
    const response = NextResponse.json({
        success: true,
        message: "Logged out successfully",
    });

    // Clear the cookie
    response.cookies.set("token", "", {
        httpOnly: true,
        sameSite: "strict",
        expires: new Date(0), // Set to expire in the past
    });

    return response;
}
