import { redirect, RedirectType } from "next/navigation";
import Link from "next/link";

import { decryptFromCookie } from "@/lib/session";
import { loginUrl, profileUpdateUrl } from "@/lib";
import { UserDetails } from "./user-details";
import { Logout } from "./logout";

export default async function ProfileServerPage() {
   const { success, user } = await decryptFromCookie("session");
   if (!success) redirect(loginUrl, RedirectType.replace);

   return (
      <section className="flex grow flex-col items-center justify-center">
         <UserDetails {...user} />
         <div className="my-4 flex items-center justify-center text-center text-sm text-neutral-400">
            <Link href={profileUpdateUrl}>Update Profile</Link>
         </div>
         <Logout />
      </section>
   );
}
