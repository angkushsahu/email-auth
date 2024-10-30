import { NextResponse } from "next/server";

import { connectDatabase, userModel } from "@/db";

type GetUserByIdContextType = {
   params: { email: string };
};

// Find user by mail
export async function GET(_: Request, context: GetUserByIdContextType) {
   const email = context.params.email;
   if (!email)
      return NextResponse.json(
         { success: false, user: null, message: "Please provide query parameter 'email'" },
         { status: 400 }
      );

   try {
      await connectDatabase();

      const user = await userModel.findOne({ email });
      if (!user) return NextResponse.json({ success: false, user: null, message: "User not found" }, { status: 404 });
      return NextResponse.json({ success: true, user, message: "User found successfully" }, { status: 200 });
   } catch (error: unknown) {
      let message = "Internal Server Error";
      if (error instanceof Error) message = error.message;
      return NextResponse.json({ success: false, user: null, message }, { status: 500 });
   }
}

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
      if (!body.email || !body.name)
         return NextResponse.json({ success: false, user: null, message: "Please provide user name and email" }, { status: 400 });

      await connectDatabase();

      const user = await userModel.findOne({ email });
      if (!user) return NextResponse.json({ success: false, user: null, message: "User not found" }, { status: 404 });

      user.name = body.name;
      user.email = body.email;
      await user.save();

      return NextResponse.json({ success: true, user, message: "User updated successfully" }, { status: 200 });
   } catch (error: unknown) {
      let message = "Internal Server Error";
      if (error instanceof Error) message = error.message;
      return NextResponse.json({ success: false, user: null, message }, { status: 500 });
   }
}
