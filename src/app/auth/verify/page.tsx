import { redirect, RedirectType } from "next/navigation";

import { decryptFromCookie } from "@/features/auth/lib/session";
import { Verification } from "./verification";
import type { PageProps } from "@/types";
import { loginUrl } from "@/lib";

export default async function VerifyPage({ searchParams }: PageProps) {
   if (!searchParams?.token || typeof searchParams.token !== "string") redirect(loginUrl, RedirectType.replace);
   const { token } = searchParams;
   const callbackUrl =
      searchParams?.callback_url && typeof searchParams.callback_url === "string" ? searchParams.callback_url : "";

   const user = await decryptFromCookie("verification", token);

   if (!user) redirect(loginUrl, RedirectType.replace);
   else return <Verification token={token} callbackUrl={callbackUrl} />;
}
