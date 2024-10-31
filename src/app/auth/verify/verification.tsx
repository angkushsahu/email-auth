"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { loginUrl, profileServerUrl } from "@/lib";
import { loginAction } from "@/actions/auth";

export function Verification({ token }: { token: string }) {
   const router = useRouter();

   useEffect(() => {
      const callLoginAction = loginAction.bind(null, token);
      callLoginAction()
         .then(() => {
            router.replace(profileServerUrl);
         })
         .catch(() => {
            router.replace(loginUrl);
         });
   }, []);

   return (
      <section className="flex grow flex-col items-center justify-center p-5 text-center">
         <h1 className="animate-pulse text-2xl">Verifying, please wait ....</h1>
      </section>
   );
}
