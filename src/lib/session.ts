import "server-only";

import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";

import type { DecryptFromCookieReturns, DecryptReturns, JWTContents, SessionPayload } from "@/types";

const getSecret = () => new TextEncoder().encode(process.env.JWT_SECRET);

export async function encrypt({ expiresAt, user }: SessionPayload) {
   return (
      new SignJWT(user)
         .setProtectedHeader({ alg: "HS256" })
         .setExpirationTime(expiresAt)
         .setIssuedAt()
         // .setSubject(id) // probably a user ID
         .sign(getSecret())
   );
}

export async function decrypt(session: string | undefined = ""): Promise<DecryptReturns> {
   try {
      const { payload }: { payload: JWTContents | null } = await jwtVerify(session, getSecret(), { algorithms: ["HS256"] });
      return { payload, success: true };
   } catch {
      return { payload: null, success: false };
   }
}

export async function decryptFromCookie(): Promise<DecryptFromCookieReturns> {
   try {
      const token = cookies().get("session")?.value;
      const { payload, success } = await decrypt(token);
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
