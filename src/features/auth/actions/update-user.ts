"use server";

import { cookies } from "next/headers";

import { setLoginCookieExpiry } from "@/features/auth/lib/set-cookie-expire";
import { encrypt } from "@/features/auth/lib/session";
import { connectDatabase, userModel } from "@/db";

type UpdateUserArgs = {
   name: string;
   email: string;
   id: string;
};

export async function updateUser({ email, id, name }: UpdateUserArgs) {
   try {
      // Connect to database
      await connectDatabase();

      // Find if user exists
      const user = await userModel.findById(id);
      if (!user) return { message: "User not found", user: null };

      // Update user credentials
      user.name = name;
      user.email = email;
      await user.save();

      const userObject = {
         id: user.id,
         name: user.name,
         email: user.email,
         createdAt: user.createdAt,
      };

      // Generate token and set as cookie
      const expiryDate = setLoginCookieExpiry();
      const token = await encrypt({ payload: userObject, expiresAt: expiryDate.stringFormat });
      cookies().set("session", token, { expires: expiryDate.dateFormat, httpOnly: true, secure: true, sameSite: true });

      return { message: "User updated successfully", user: userObject };
   } catch (error: unknown) {
      let message = "Internal Server Error";
      if (error instanceof Error) message = error.message;
      return { message, user: null };
   }
}
