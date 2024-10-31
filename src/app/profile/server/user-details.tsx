import type { JWTContents } from "@/types";

export function UserDetails({ createdAt, email, id, name }: JWTContents) {
   return (
      <div>
         <p>{id}</p>
         <p>{name}</p>
         <p>{email}</p>
         <p>{createdAt}</p>
      </div>
   );
}
