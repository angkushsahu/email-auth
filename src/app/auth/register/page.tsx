import Link from "next/link";

import { RegisterForm } from "./form";
import { loginUrl } from "@/lib";

export default function RegisterPage() {
   return (
      <section className="flex grow flex-col items-center justify-center">
         <div className="w-full max-w-md space-y-5">
            <h1 className="title">Register</h1>
            <RegisterForm />
            <div className="flex items-center justify-center text-sm text-muted-foreground">
               <Link href={loginUrl}>Login instead?</Link>
            </div>
         </div>
      </section>
   );
}
