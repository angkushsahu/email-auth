import Link from "next/link";

import type { PageProps } from "@/types";
import { registerUrl } from "@/lib";
import { LoginForm } from "./form";

export default function LoginPage({ searchParams }: PageProps) {
   const callbackUrl =
      searchParams?.callback_url && typeof searchParams.callback_url === "string" ? searchParams.callback_url : "";

   return (
      <section className="flex grow flex-col items-center justify-center">
         <div className="w-full max-w-md space-y-5">
            <h1 className="title">Login</h1>
            <LoginForm callbackUrl={callbackUrl} />
            <div className="flex items-center justify-center text-sm text-muted-foreground">
               <Link href={registerUrl}>Register instead?</Link>
            </div>
         </div>
      </section>
   );
}
