import User from "@/lib/models/user-model";
import dbConnect from "@/lib/services/mongodb";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";


export async function POST(req) {

  const request = await req.json()
  const token = request.token

  try {
    const jwtRes = jwt.verify(token, process.env.JWT_SECRET)


    await dbConnect();
    const user = await User.findOne({ email: jwtRes.email })
    if (!user.isNotVerified) {
      return NextResponse.json({ msg: "User is already Verified." }, { status: 409 })
    }
    user.isNotVerified = false
    delete user.isNotVerified;
    delete user.verificationSentAt
    await user.save();
    return NextResponse.json({ msg: "User Verification Sucess." }, { status: 200 })



  } catch (error) {

    if (error.name === "JsonWebTokenError")
      return NextResponse.json({ msg: "User Verification Failed. User not found." }, { status: 400 })

    else if (error.name === "TokenExpiredError")
      return NextResponse.json({ msg: "Verification link has expired. Login to get another Link." }, { status: 400 })

    else if (error.name.includes('Mongo'))
      return NextResponse.json({ msg: 'Internal server error. Try again later.' }, { status: 500 })

    return NextResponse.json({ msg: "User Verification Failed. Try again later." }, { status: 500 })

  }



}