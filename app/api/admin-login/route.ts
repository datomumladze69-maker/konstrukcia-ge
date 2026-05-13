import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const body = await request.json()
  const password = String(body.password || "")

  if (!process.env.ADMIN_PASSWORD) {
    return NextResponse.json(
      { success: false, message: "ADMIN_PASSWORD არ არის დაყენებული" },
      { status: 500 }
    )
  }

  if (!process.env.ADMIN_SESSION_SECRET) {
    return NextResponse.json(
      { success: false, message: "ADMIN_SESSION_SECRET არ არის დაყენებული" },
      { status: 500 }
    )
  }

  if (password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json(
      { success: false, message: "პაროლი არასწორია" },
      { status: 401 }
    )
  }

  const response = NextResponse.json({
    success: true,
  })

  response.cookies.set("admin_session", process.env.ADMIN_SESSION_SECRET, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24,
  })

  return response
}
