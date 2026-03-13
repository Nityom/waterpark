import { NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, ADMIN_COOKIE_VALUE, isValidAdminCredentials } from "../../../../lib/adminAuth";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    if (!isValidAdminCredentials(email, password)) {
      return NextResponse.json(
        { error: "Invalid username or password" },
        { status: 401 }
      );
    }

    const response = NextResponse.json({ success: true });
    response.cookies.set({
      name: ADMIN_COOKIE_NAME,
      value: ADMIN_COOKIE_VALUE,
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 12,
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { error: error?.message || "Login failed" },
      { status: 500 }
    );
  }
}
