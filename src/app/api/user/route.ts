import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { decrypt } from "@/lib/session";

export async function GET() {
   try {
      const token = cookies().get("session")?.value;
      const session = await decrypt(token);
      return NextResponse.json({ success: true, session: session.payload });
   } catch {
      return NextResponse.json({ success: false, session: null });
   }
}
