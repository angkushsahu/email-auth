import type { PropsWithChildren } from "react";
import type { JWTPayload } from "jose";

export type Children<T = void> = Readonly<PropsWithChildren<T>>;

export type User = {
   name: string;
   email: string;
   joinedOn: string;
   id: string;
};

export type SessionPayload = {
   user: User;
   expiresAt: Date;
};

export type JWTContents = JWTPayload & User;
export type DecryptReturns = { success: true; payload: JWTContents } | { success: false; payload: null };
