"use client";

import { usePathname, useRouter } from "next/navigation";

import { deleteSessionCookie } from "@/actions";
import { Button } from "@/components";
import { loginUrl } from "@/lib";

export function Logout() {
   const router = useRouter();
   const pathname = usePathname();

   async function onLogout() {
      await deleteSessionCookie();
      router.replace(`${loginUrl}?callback_url=${pathname}`);
   }

   return <Button onClick={onLogout}>Logout</Button>;
}
