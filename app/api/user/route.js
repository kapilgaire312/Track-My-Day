import { NextResponse } from "next/server";

export async function POST(req) {
  const user = await req.body
  console.log(user)
  if (user)
    return NextResponse.json({ msg: `hello user ${user.name}` })

}