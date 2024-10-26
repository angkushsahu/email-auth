import { NextResponse, type NextRequest } from "next/server";
import { cookies } from "next/headers";

import { loginUrl, profileClientUrl, profileServerUrl, protectedUrl, registerUrl } from "./lib";
import { decrypt } from "./lib/session";

const protectedRoutes = [protectedUrl, profileClientUrl, profileServerUrl];
const publicRoutes = [registerUrl, loginUrl];

export default async function middleware(req: NextRequest) {
   const path = req.nextUrl.pathname;
   const isProtectedRoute = protectedRoutes.includes(path);
   const isPublicRoute = publicRoutes.includes(path);

   const cookie = cookies().get("session")?.value;
   const session = await decrypt(cookie);

   if (isProtectedRoute && !session?.payload?.email) return NextResponse.redirect(new URL(loginUrl, req.nextUrl));
   else if (isPublicRoute && session.payload?.email) return NextResponse.redirect(new URL(profileClientUrl, req.nextUrl));

   return NextResponse.next();
}
