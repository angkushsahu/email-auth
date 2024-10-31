"use server";

import { cookies } from "next/headers";

import { setLoginCookieExpiry } from "@/lib/set-cookie-expire";
import { decryptFromCookie } from "@/lib/session";

export async function getUserFromSession() {
   return await decryptFromCookie("session");
}

export async function setSessionCookie(token: string) {
   const expiryDate = setLoginCookieExpiry();
   const webCookies = cookies();

   webCookies.set("session", token, { expires: expiryDate });
   if (webCookies.has("verification")) webCookies.delete("verification");
}

export async function deleteSessionCookie() {
   cookies().delete("session");
}
