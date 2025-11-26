import User from "@/lib/models/user-model";
import dbConnect from "@/lib/services/mongodb";
import bcrypt from "bcrypt"
import { NextResponse } from "next/server";
import { validateSignupInfo } from "../utils";
import sendVerificationMail from "../sendVerificationMail";


export async function POST(req) {
  const user = await req.json()

  try {
    validateSignupInfo(user);

    await dbConnect();
    const userDb = await User.findOne({ email: user.email });

    if (!userDb) {
      throw new Error('User with that email not found.')
    }
    if (userDb.isNotVerified) {

      const now = new Date();
      const diff = now - userDb.verificationSentAt  //gives the difference in milliseconds between the two dates.
      console.log(diff)
      if (diff > 24 * 60 * 60 * 1000 || isNaN(diff)) {
        try {
          await sendVerificationMail(userDb.email)
          userDb.verificationSentAt = now;
          await userDb.save()
        } catch (error) {
          throw new Error('User not verified. Error sending verification email.')
        }
      }

      throw new Error('User is not verified. Check your inbox.')

    }

    const isMatch = await bcrypt.compare(user.password, userDb.password)
    console.log(isMatch)
    if (!isMatch) {
      throw new Error("Email and password don't match");
    }

    return NextResponse.json({ msg: 'sucess' }, { status: 200 })
  } catch (error) {
    console.log(error)
    if (error.name.includes("Mongo"))
      return NextResponse.json({ msg: 'Internal server error. Try again later.' }, { status: 500 })
    return NextResponse.json({ msg: error.message }, { status: 400 })
  }





}

