import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { setVerifyCookieExpiry } from "@/lib/set-cookie-expire";
import type { GetUserByIdContextType } from "@/types";
import { connectDatabase, userModel } from "@/db";
import { sendMail } from "@/lib/send-mail";
import { encrypt } from "@/lib/session";

// login user
export async function POST(request: Request, context: GetUserByIdContextType) {
   try {
      // Validation request body
      const body = await request.json();
      if (!body?.email || typeof body.email !== "string")
         return NextResponse.json({ success: false, user: null, message: "Please provide user email" }, { status: 400 });

      // Connect to database
      await connectDatabase();

      // Find user
      const user = await userModel.findOne({ email: body.email });
      if (!user) return NextResponse.json({ success: false, user: null, message: "User not found" }, { status: 404 });

      const userObject = {
         _id: user.id,
         name: user.name,
         email: user.email,
         createdAt: user.createdAt,
      };

      // Generate token
      const expiryDate = setVerifyCookieExpiry();
      const token = await encrypt({ payload: userObject, expiresAt: expiryDate });

      // Send authentication mail
      const isMailSent = await sendMail({ callbackUrl: "", email: user.email, fullName: user.name, token });
      if (!isMailSent) return NextResponse.json({ success: false, user: null, message: "Unable to send email" }, { status: 500 });

      // Set verification email
      cookies().set("verification", token, { expires: expiryDate });

      // Return response
      return NextResponse.json({ success: true, user: userObject, message: "Check your email to login" }, { status: 200 });
   } catch (error: unknown) {
      let message = "Internal Server Error";
      if (error instanceof Error) message = error.message;
      return NextResponse.json({ success: false, user: null, message }, { status: 500 });
   }
}
