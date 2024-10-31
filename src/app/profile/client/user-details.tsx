"use client";

import { useGetUser } from "@/hooks";

export function UserDetails() {
   const { status, data } = useGetUser();

   if (status === "loading") return null;

   return (
      <div>
         <p>{data?.id}</p>
         <p>{data?.name}</p>
         <p>{data?.email}</p>
         <p>{data?.createdAt}</p>
      </div>
   );
}
