"use client";

import { useRouter } from "next/navigation";

import { deleteSessionCookie } from "@/actions";
import { Button } from "@/components";
import { loginUrl } from "@/lib";

export function Logout() {
   const router = useRouter();

   async function onLogout() {
      await deleteSessionCookie();
      router.replace(loginUrl);
   }

   return <Button onClick={onLogout}>Logout</Button>;
}
