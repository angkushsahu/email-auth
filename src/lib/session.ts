import "server-only";

import { jwtVerify, SignJWT } from "jose";

import type { DecryptReturns, JWTContents, SessionPayload } from "@/types";

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
