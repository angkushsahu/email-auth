import { NextResponse, type NextRequest } from "next/server";

import { decryptFromCookie } from "@/features/auth/lib/session";
import * as route from "./lib/constants";

const protectedRoutes = [route.protectedUrl, route.profileClientUrl, route.profileServerUrl, route.profileUpdateUrl];
const publicRoutes = [route.registerUrl, route.loginUrl]; // ATTENTION: DO NOT include 'check-mail route' and 'verify-mail route' here

export default async function middleware(req: NextRequest) {
   const path = req.nextUrl.pathname;
   const isProtectedRoute = protectedRoutes.includes(path);
   const isPublicRoute = publicRoutes.includes(path);

   const user = await decryptFromCookie("session");
   const userToBeVerified = await decryptFromCookie("verification");

   // Setting this ensures that the api call in the `check-mail` page is omitted, hence, the same api is not called twice
   const updatedCheckMailUrl = `${route.checkMailUrl}?verification_token=true`;

   // if user is NOT logged in, don't show him sensitive pages
   if (isProtectedRoute && !user) {
      // if applied for mail-verification, redirect to `check-mail` page
      if (userToBeVerified) return NextResponse.redirect(new URL(updatedCheckMailUrl, req.nextUrl));
      // if NOT applied for mail-verification, then redirect to login
      let callbackUrl = "";
      const checkCallbackUrlValidity = [route.registerUrl, route.loginUrl, route.checkMailUrl, route.verifyMailUrl].includes(
         path
      );

      if (checkCallbackUrlValidity) callbackUrl = route.loginUrl;
      else callbackUrl = `${route.loginUrl}?callback_url=${path}`;

      return NextResponse.redirect(new URL(callbackUrl, req.nextUrl));
   }
   // if user is NOT logged in, and he is still to be verified
   else if (isPublicRoute && !user && userToBeVerified) {
      return NextResponse.redirect(new URL(updatedCheckMailUrl, req.nextUrl));
   }
   // if user is logged in, don't show him `auth` pages
   // ATTENTION: If we need to implement authorization, we can add security checks for that in this `else-if` statement
   else if (isPublicRoute && user) {
      return NextResponse.redirect(new URL(route.profileServerUrl, req.nextUrl));
   }

   return NextResponse.next();
}
