import { Resend } from "resend";
import jwt from "jsonwebtoken";

export default async function sendVerificationMail(email) {
  const resend = new Resend(process.env.RESEND_API);

  const token = jwt.sign(
    { email },
    process.env.JWT_SECRET,
    { expiresIn: "24h" },
  );

  const verifyLink = `${process.env.APP_URL.replace(/\/$/, "")}/verify?token=${token}`;

  const { data, error } = await resend.emails.send({
    from: "welcome@kapilgaire123.com.np",
    to: email,
    subject: "Verify your Track My Day account",
    text: `Welcome to Track My Day!

Please verify your email address to finish creating your account:
${verifyLink}

This link expires in 24 hours. If you did not create this account, you can ignore this email.`,
    html: `
      <div style="margin:0;background:#f3f4f6;padding:32px 16px;font-family:Arial,sans-serif;color:#374151;">
        <div style="display:none;max-height:0;overflow:hidden;opacity:0;">
          Verify your email to start using Track My Day.
        </div>
        <div style="margin:0 auto;max-width:560px;border:1px solid #d1d5db;border-radius:10px;background:#ffffff;overflow:hidden;">
          <div style="background:#d1d5db;padding:22px 28px;">
            <div style="font-size:24px;font-weight:700;color:#111827;">Track My Day</div>
            <div style="margin-top:4px;font-size:14px;color:#4b5563;">A simpler way to understand your time</div>
          </div>
          <div style="padding:30px 28px;">
            <h1 style="margin:0 0 16px;font-size:24px;line-height:1.3;color:#111827;">Welcome aboard!</h1>
            <p style="margin:0 0 16px;font-size:16px;line-height:1.6;">
              Thanks for signing up. Please verify your email address to finish creating your account.
            </p>
            <p style="margin:24px 0;text-align:center;">
              <a href="${verifyLink}" style="display:inline-block;border-radius:6px;background:#374151;padding:13px 22px;color:#ffffff;font-size:16px;font-weight:700;text-decoration:none;">
                Verify my account
              </a>
            </p>
            <p style="margin:0 0 10px;font-size:14px;line-height:1.6;color:#6b7280;">
              This verification link expires in 24 hours.
            </p>
            <p style="margin:0;font-size:14px;line-height:1.6;color:#6b7280;">
              If the button does not work, copy and paste this link into your browser:
            </p>
            <p style="word-break:break-all;font-size:13px;line-height:1.5;color:#4b5563;">
              ${verifyLink}
            </p>
          </div>
          <div style="border-top:1px solid #e5e7eb;padding:18px 28px;color:#9ca3af;font-size:12px;line-height:1.5;">
            If you did not create a Track My Day account, you can safely ignore this email.
          </div>
        </div>
      </div>
    `,
  });
  if (error) {
    throw new Error("Sign Up Failed. Try again later.");
  }
  console.log(data);
}