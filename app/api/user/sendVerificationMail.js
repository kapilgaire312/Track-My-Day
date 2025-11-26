import { Resend } from "resend";
import jwt from "jsonwebtoken"

export default async function sendVerificationMail(email) {

  const resend = new Resend(process.env.RESEND_API);

  const token = jwt.sign(
    { email }, // data payload
    process.env.JWT_SECRET,  //secret key to sign it with
    { expiresIn: "24h" } //expiry date
  )

  const verifyLink = `${process.env.APP_URL}/verify?token=${token}`

  const { data, error } = await resend.emails.send({
    from: 'welcome@kapilgaire123.com.np',
    to: email,
    subject: 'Hello World',
    html: `<p>Congrats on joining us! Click <a href=${verifyLink} >here</a> to verify your account. </p>`
  });
  if (error) {
    throw new Error('Sign Up Failed. Try again later.')
  }
  else
    console.log(data)



}