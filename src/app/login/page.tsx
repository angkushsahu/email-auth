import Link from "next/link";

import { registerUrl } from "@/lib";
import { LoginForm } from "./form";

export default function LoginPage() {
   return (
      <section className="flex grow flex-col items-center justify-center">
         <div className="w-full max-w-md space-y-5">
            <h1 className="title">Login</h1>
            <LoginForm />
            <div className="flex items-center justify-center text-sm text-muted-foreground">
               <Link href={registerUrl}>Register instead?</Link>
            </div>
         </div>
      </section>
   );
}
