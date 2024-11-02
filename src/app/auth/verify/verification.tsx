"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { setSessionCookie } from "@/features/auth";
import { loginUrl, profileServerUrl } from "@/lib";

type VerificationProps = {
   token: string;
   callbackUrl: string;
};

export function Verification({ callbackUrl, token }: VerificationProps) {
   const router = useRouter();

   useEffect(() => {
      async function loginToApplication() {
         const callLoginAction = setSessionCookie.bind(null, token);
         const response = await callLoginAction();

         let authUrl = "";
         let nonAuthUrl = "";

         if (callbackUrl.length) {
            authUrl = callbackUrl;
            nonAuthUrl = `&callback_url=${callbackUrl}`;
         } else authUrl = profileServerUrl;

         if (response) router.replace(authUrl);
         else router.replace(loginUrl + nonAuthUrl);
      }

      loginToApplication();
      // eslint-disable-next-line
   }, []);

   return (
      <section className="flex grow flex-col items-center justify-center p-5 text-center">
         <h1 className="animate-pulse text-2xl">Verifying, please wait ....</h1>
      </section>
   );
}
