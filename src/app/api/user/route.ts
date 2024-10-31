import { NextResponse } from "next/server";

import { decryptFromCookie } from "@/lib/session";
import { connectDatabase, userModel } from "@/db";

// Get user through encrypted cookie
export async function GET() {
   try {
      const { user } = await decryptFromCookie("session");
      if (!user) return NextResponse.json({ success: false, user: null, message: "User not found" }, { status: 404 });
      return NextResponse.json({ success: true, user, message: "User found successfully" }, { status: 200 });
   } catch (error: unknown) {
      let message = "Internal Server Error";
      if (error instanceof Error) message = error.message;
      return NextResponse.json({ success: false, user: null, message }, { status: 500 });
   }
}

// Create a new user
export async function POST(request: Request) {
   try {
      const body = await request.json();
      if (!body.email || !body.name || typeof body.email !== "string" || typeof body.name !== "string")
         return NextResponse.json({ success: false, user: null, message: "Please provide user name and email" }, { status: 400 });

      await connectDatabase();

      const user = await userModel.create({ name: body.name, email: body.email });
      if (!user) return NextResponse.json({ success: false, user: null, message: "Unable to create user" }, { status: 500 });
      return NextResponse.json({ success: true, user, message: "User created successfully" }, { status: 201 });
   } catch (error: unknown) {
      let message = "Internal Server Error";
      if (error instanceof Error) message = error.message;
      return NextResponse.json({ success: false, user: null, message }, { status: 500 });
   }
}
