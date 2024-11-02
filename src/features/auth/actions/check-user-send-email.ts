"use server";

import { cookies } from "next/headers";

import { setVerifyCookieExpiry } from "@/features/auth/lib/set-cookie-expire";
import { sendMail } from "@/features/auth/lib/send-mail";
import { encrypt } from "@/features/auth/lib/session";
import { connectDatabase, userModel } from "@/db";

type CheckUserAndSendMailArgs = {
   email: string;
   callbackUrl: string;
};

export async function checkUserAndSendMail({ callbackUrl, email }: CheckUserAndSendMailArgs) {
   try {
      // Connect to database
      await connectDatabase();

      // Find user
      const user = await userModel.findOne({ email });
      if (!user) return { message: "User not found", user: null };

      const userObject = {
         id: user.id,
         name: user.name,
         email: user.email,
         createdAt: user.createdAt,
      };

      // Generate token
      const expiryDate = setVerifyCookieExpiry();
      const token = await encrypt({ payload: userObject, expiresAt: expiryDate.stringFormat });

      // Send authentication mail
      const isMailSent = await sendMail({ callbackUrl, email: user.email, fullName: user.name, token });
      if (!isMailSent) return { message: "Unable to send email", user: null };

      // Set verification email
      cookies().set("verification", token, { expires: expiryDate.dateFormat, httpOnly: true, secure: true, sameSite: true });
      return { message: "Check your email to login", user: userObject };
   } catch (error: unknown) {
      let message = "Internal Server Error";
      if (error instanceof Error) message = error.message;
      return { message, user: null };
   }
}
