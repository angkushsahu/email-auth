import type { PropsWithChildren } from "react";
import type { JWTPayload } from "jose";

export type Children<T = void> = Readonly<PropsWithChildren<T>>;

export type PageProps = {
   params: { slug: string };
   searchParams: Record<string, string | Array<string> | undefined>;
};

export type User = {
   name: string;
   email: string;
   createdAt: string;
   id: string;
};

export type SessionPayload = {
   payload: Readonly<Record<string, unknown>>;
   expiresAt: Date;
};

export type JWTContents = JWTPayload & User;
