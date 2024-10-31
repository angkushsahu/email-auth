"use server";

import { setLoginCookieExpiry } from "@/lib/set-cookie-expire";
import { cookies } from "next/headers";

export async function loginAction(token: string) {
   const expiryDate = setLoginCookieExpiry();
   const webCookies = cookies();

   webCookies.set("session", token, { expires: expiryDate });
   if (webCookies.has("verification")) webCookies.delete("verification");
}

export async function logoutAction() {
   cookies().delete("session");
}
