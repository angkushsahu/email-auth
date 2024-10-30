"use client";

import { useRouter } from "next/navigation";

import { logoutAction } from "@/actions/auth";
import { Button } from "@/components";
import { loginUrl } from "@/lib";

export function Logout() {
   const router = useRouter();

   async function onLogout() {
      await logoutAction();
      router.replace(loginUrl);
   }

   return <Button onClick={onLogout}>Logout</Button>;
}
