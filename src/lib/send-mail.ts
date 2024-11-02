import "server-only";

import type Mail from "nodemailer/lib/mailer";
import { createTransport } from "nodemailer";

type SendMailArgs = {
   callbackUrl: string;
   email: string;
   fullName: string;
   token: string;
};

export async function sendMail({ callbackUrl, email, fullName, token }: SendMailArgs) {
   if (!process.env.MAIL_PASS || !process.env.MAIL || !process.env.MAIL_SERVICE)
      throw new Error("Please specify environment variables: MAIL_PASS, MAIL, MAIL_SERVICE");

   let baseUrl = "";

   if (typeof window !== "undefined") baseUrl = window.location.origin;
   else if (process.env.VERCEL_URL) baseUrl = `https://${process.env.VERCEL_URL}`;
   else baseUrl = `http://localhost:${process.env.PORT ?? 3000}`;

   const link = `${baseUrl}/auth/verify?token=${token}` + (callbackUrl.length ? `&callback_url=${callbackUrl}` : "");
   const applicationName = "E-mail authentication";

   const transporter = createTransport({
      service: process.env.MAIL_SERVICE,
      auth: { user: process.env.MAIL, pass: process.env.MAIL_PASS },
   });

   const html = `
   <p>Hi ${fullName}</p>
   <p>A request has been made to log in to your account. Click the link below to proceed:</p>
   <p>
      <a href="${link}" rel="noopener noreferrer" target="_blank">
         <button style="border-radius: 6px; outline: none; border: none; padding: 0.8rem 2rem; background-color: black; color: white; font-weight: 600; letter-spacing: 0.025em; font-size: 1.4rem; cursor: pointer;">LOGIN</button>
      </a>
   </p>
   <p>For your security, <strong>this link will expire in 15 minutes</strong>. If you didn't request this login, please ignore this message.</p>

   Thank you,
   ${applicationName} Team
   `;

   const mailOptions: Mail.Options = {
      from: process.env.MAIL,
      to: email,
      subject: `Complete Your Login to ${applicationName}`,
      html,
   };

   try {
      await transporter.sendMail(mailOptions);
      return true;
   } catch {
      return false;
   }
}
