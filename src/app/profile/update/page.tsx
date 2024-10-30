import { redirect, RedirectType } from "next/navigation";
import Link from "next/link";

import { loginUrl, profileClientUrl, profileServerUrl } from "@/lib";
import { decryptFromCookie } from "@/lib/session";
import { UpdateForm } from "./form";

export default async function UpdatePage() {
   const { success, user } = await decryptFromCookie();
   if (!success) redirect(loginUrl, RedirectType.replace);

   return (
      <section className="flex grow flex-col items-center justify-center">
         <div className="w-full max-w-md space-y-5">
            <h1 className="title">Update</h1>
            {/* <UpdateForm email={session.payload.email} name={session.payload.name} _id={session.payload._id} /> */}
            <UpdateForm {...user} />
            <div className="flex items-center justify-center gap-x-8 text-sm text-muted-foreground">
               <Link href={profileClientUrl}>Profile Client</Link>
               <Link href={profileServerUrl}>Profile Server</Link>
            </div>
         </div>
      </section>
   );
}
