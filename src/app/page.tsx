import { cookies } from "next/headers";
import Link from "next/link";

import { loginUrl, profileClientUrl, profileServerUrl, protectedUrl, publicUrl, registerUrl } from "@/lib";
import { decrypt } from "@/lib/session";

export default async function Homepage() {
   const token = cookies().get("session")?.value;
   const { success } = await decrypt(token);
   const isAuth = success;

   return (
      <section className="flex grow flex-col items-center justify-center text-center">
         <h1 className="title">Home page</h1>
         <p className="mb-8 mt-4 text-muted-foreground">{isAuth ? "You are authenticated" : "You are NOT authenticated"}</p>
         <div className="flex items-center justify-center gap-x-4 text-sm text-muted-foreground underline">
            {isAuth ? (
               <>
                  <Link href={protectedUrl}>Protected</Link>
                  <Link href={profileServerUrl}>Profile Server</Link>
                  <Link href={profileClientUrl}>Profile Client</Link>
               </>
            ) : (
               <>
                  <Link href={registerUrl}>Register</Link>
                  <Link href={loginUrl}>Login</Link>
               </>
            )}
            <Link href={publicUrl}>Public</Link>
         </div>
      </section>
   );
}
