import "server-only";

import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";

import type { JWTContents, SessionPayload, User } from "@/types";

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

export async function decrypt(session: string | undefined = ""): Promise<JWTContents | null> {
   if (!session) return null;
   try {
      const { payload }: { payload: JWTContents | null } = await jwtVerify(session, getSecret(), { algorithms: ["HS256"] });
      return payload;
   } catch {
      return null;
   }
}

export async function decryptFromCookie(
   cookieName: "session" | "verification",
   token: string | null = null
): Promise<User | null> {
   try {
      const session = token ?? cookies().get(cookieName)?.value;
      const payload = await decrypt(session);
      if (!payload) return null;

      const user = {
         id: payload.id,
         name: payload.name,
         email: payload.email,
         createdAt: payload.createdAt,
      };

      return user;
   } catch {
      return null;
   }
}
