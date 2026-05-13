import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function GET() {
  const cookieStore = await cookies()

  const session =
    cookieStore.get("admin_session")?.value

  const isLoggedIn =
    Boolean(process.env.ADMIN_SESSION_SECRET) &&
    session ===
      process.env.ADMIN_SESSION_SECRET

  return NextResponse.json({
    isLoggedIn,
  })
}