import { NextResponse, type NextRequest } from "next/server";

import { loginUrl, profileClientUrl, profileServerUrl, profileUpdateUrl, protectedUrl, registerUrl } from "./lib";
import { decryptFromCookie } from "./lib/session";

const protectedRoutes = [protectedUrl, profileClientUrl, profileServerUrl, profileUpdateUrl];
const publicRoutes = [registerUrl, loginUrl];

export default async function middleware(req: NextRequest) {
   const path = req.nextUrl.pathname;
   const isProtectedRoute = protectedRoutes.includes(path);
   const isPublicRoute = publicRoutes.includes(path);

   const { user } = await decryptFromCookie();

   if (isProtectedRoute && !user) return NextResponse.redirect(new URL(loginUrl, req.nextUrl));
   else if (isPublicRoute && user) return NextResponse.redirect(new URL(profileClientUrl, req.nextUrl));

   return NextResponse.next();
}
