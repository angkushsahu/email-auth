import "server-only";

import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";

import type { DecryptFromCookieReturns, DecryptReturns, JWTContents, SessionPayload } from "@/types";

function getSecret() {
   if (!process.env.JWT_SECRET) throw new Error("Please specify environment variable 'JWT_SECRET'");
   return new TextEncoder().encode(process.env.JWT_SECRET);
}

export async function encrypt({ expiresAt, payload }: SessionPayload) {
   return (
      new SignJWT(payload)
         .setProtectedHeader({ alg: "HS256" })
         .setExpirationTime(expiresAt)
         .setIssuedAt()
         // .setSubject(id) // probably a user ID
         .sign(getSecret())
   );
}

export async function decrypt(session: string | undefined = ""): Promise<DecryptReturns> {
   if (!session) return { payload: null, success: false };
   try {
      const { payload }: { payload: JWTContents | null } = await jwtVerify(session, getSecret(), { algorithms: ["HS256"] });
      return { payload, success: true };
   } catch {
      return { payload: null, success: false };
   }
}

export async function decryptFromCookie(
   cookieName: "session" | "verification",
   token: string | null = null
): Promise<DecryptFromCookieReturns> {
   try {
      const session = token ?? cookies().get(cookieName)?.value;
      const { payload, success } = await decrypt(session);
      if (!success) return { user: null, success: false };

      const user = {
         _id: payload._id,
         name: payload.name,
         email: payload.email,
         createdAt: payload.createdAt,
      };

      return { user, success: true };
   } catch {
      return { user: null, success: false };
   }
}
