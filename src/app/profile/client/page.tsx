import Link from "next/link";

import { UserDetails } from "./user-details";
import { profileUpdateUrl } from "@/lib";
import { Logout } from "./logout";

export default function ProfileClientPage() {
   return (
      <section className="flex grow flex-col items-center justify-center">
         <UserDetails />
         <div className="my-4 flex items-center justify-center text-center text-sm text-neutral-400">
            <Link href={profileUpdateUrl}>Update Profile</Link>
         </div>
         <Logout />
      </section>
   );
}
