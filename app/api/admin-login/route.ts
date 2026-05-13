import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const body = await request.json()

  const password = String(body.password || "")

  if (!process.env.ADMIN_PASSWORD) {
    return NextResponse.json(
      {
        success: false,
        message: "ADMIN_PASSWORD არ არის დაყენებული",
      },
      {
        status: 500,
      }
    )
  }

  if (password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json(
      {
        success: false,
        message: "პაროლი არასწორია",
      },
      {
        status: 401,
      }
    )
  }

  return NextResponse.json({
    success: true,
  })
}
