import { redirect, RedirectType } from "next/navigation";
import { Mail } from "lucide-react";

import { decryptFromCookie } from "@/lib/session";
import type { PageProps } from "@/types";
import { loginUrl } from "@/lib";

export default async function CheckMailPage({ searchParams }: PageProps) {
   const checkVerificationCookie = searchParams?.verification_token === "true";
   let verifiedUser = null;

   if (checkVerificationCookie) verifiedUser = await decryptFromCookie("verification");
   if (!verifiedUser) redirect(loginUrl, RedirectType.replace);

   return (
      <section className="flex grow flex-col items-center justify-center p-5 text-center">
         <Mail strokeWidth={1} className="size-32 text-neutral-400 sm:size-48" />
         <h1 className="my-6 text-3xl font-semibold">Check your e-mail</h1>
         <p className="max-w-[60ch] text-muted-foreground sm:text-lg">
            We&apos;ve just sent a link to your registered mail inbox. Click the link to access your account and get started! If
            you don&apos;t see it, check your spam or promotions folder, just in case. 😊
         </p>
      </section>
   );
}
