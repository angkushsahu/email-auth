"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { loginUrl, profileServerUrl } from "@/lib";
import { setSessionCookie } from "@/actions";

export function Verification({ token }: { token: string }) {
   const router = useRouter();

   useEffect(() => {
      async function loginToApplication() {
         const callLoginAction = setSessionCookie.bind(null, token);
         const response = await callLoginAction();

         if (response) router.replace(profileServerUrl);
         else router.replace(loginUrl);
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
