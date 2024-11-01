"use server";

import { cookies } from "next/headers";

import { setLoginCookieExpiry } from "@/lib/set-cookie-expire";
import { decryptFromCookie, encrypt } from "@/lib/session";

export async function getUserFromSession() {
   return await decryptFromCookie("session");
}

export async function setSessionCookie(token: string) {
   const expiryDate = setLoginCookieExpiry();
   const webCookies = cookies();

   const user = await decryptFromCookie("verification", token);
   if (!user) return false;

   const newToken = await encrypt({ expiresAt: expiryDate.stringFormat, payload: user });
   webCookies.set("session", newToken, { expires: expiryDate.dateFormat });
   if (webCookies.has("verification")) webCookies.delete("verification");

   return true;
}

export async function deleteSessionCookie() {
   cookies().delete("session");
}
