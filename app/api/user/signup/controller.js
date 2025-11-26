import User from "@/lib/models/user-model";
import bcrypt from "bcrypt"
import dbConnect from "@/lib/services/mongodb";
import sendVerificationMail from "../sendVerificationMail";

export async function createUser(user) {

  await dbConnect();

  const userExits = await User.findOne({ email: user.email })
  if (userExits) {
    throw new Error('User with this email already exists.')
  }

  const hashPass = await bcrypt.hash(user.password, 10)
  await sendVerificationMail(user.email)
  const newUser = await User.create({
    email: user.email,
    password: hashPass,
    activities: null,
    verificationSentAt: new Date()
  })
  console.log(newUser)
}