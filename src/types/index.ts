import type { PropsWithChildren } from "react";
import type { JWTPayload } from "jose";

export type Children<T = void> = Readonly<PropsWithChildren<T>>;

export type PageProps = {
   params: { slug: string };
   searchParams: Record<string, string | Array<string> | undefined>;
};

export type GetUserByIdContextType = {
   params: { email: string };
};

export type User = {
   name: string;
   email: string;
   createdAt: string;
   _id: string;
};

export type SessionPayload = {
   payload: Readonly<Record<string, unknown>>;
   expiresAt: Date;
};

export type JWTContents = JWTPayload & User;
export type DecryptReturns = { success: true; payload: JWTContents } | { success: false; payload: null };
export type DecryptFromCookieReturns = { success: true; user: User } | { success: false; user: null };

export type Response =
   | {
        success: true;
        user: User;
        message: string;
     }
   | {
        success: false;
        user: null;
        message: string;
     };
