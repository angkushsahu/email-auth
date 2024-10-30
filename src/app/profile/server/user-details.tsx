import type { JWTContents } from "@/types";

export function UserDetails({ createdAt, email, _id, name }: JWTContents) {
   return (
      <div>
         <p>{_id}</p>
         <p>{name}</p>
         <p>{email}</p>
         <p>{createdAt}</p>
      </div>
   );
}
