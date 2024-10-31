import { NextResponse } from "next/server";

import { setLoginCookieExpiry } from "@/lib/set-cookie-expire";
import type { GetUserByIdContextType } from "@/types";
import { connectDatabase, userModel } from "@/db";
import { encrypt } from "@/lib/session";
import { cookies } from "next/headers";

// Update user
export async function PUT(request: Request, context: GetUserByIdContextType) {
   const email = context.params.email;
   if (!email)
      return NextResponse.json(
         { success: false, user: null, message: "Please provide query parameter 'email'" },
         { status: 400 }
      );

   try {
      const body = await request.json();
      if (!body.email || !body.name || typeof body.email !== "string" || typeof body.name !== "string")
         return NextResponse.json({ success: false, user: null, message: "Please provide user name and email" }, { status: 400 });

      await connectDatabase();

      const user = await userModel.findOne({ email });
      if (!user) return NextResponse.json({ success: false, user: null, message: "User not found" }, { status: 404 });

      user.name = body.name;
      user.email = body.email;
      await user.save();

      const userObject = {
         _id: user.id,
         name: user.name,
         email: user.email,
         createdAt: user.createdAt,
      };

      const expiryDate = setLoginCookieExpiry();
      const token = await encrypt({ payload: userObject, expiresAt: expiryDate });
      cookies().set("session", token, { maxAge: expiryDate.getTime() });

      return NextResponse.json({ success: true, user, message: "User updated successfully" }, { status: 200 });
   } catch (error: unknown) {
      let message = "Internal Server Error";
      if (error instanceof Error) message = error.message;
      return NextResponse.json({ success: false, user: null, message }, { status: 500 });
   }
}
