"use client";

import { useEffect, useState } from "react";

import { getUserFromSession } from "@/actions";
import type { User } from "@/types";

export function useGetUser() {
   const [status, setStatus] = useState<"loading" | "error" | "success">("loading");
   const [error, setError] = useState<Error | null>(null);
   const [data, setData] = useState<User | null>(null);

   useEffect(() => {
      async function getUser() {
         try {
            if (status !== "loading") setStatus("loading");

            const user = await getUserFromSession();

            if (user) {
               setStatus("success");
               setData(user);
               if (error !== null) setError(null);
            } else {
               setError({ message: "Unknown Error", name: "Unknown Error" });
               setStatus("error");
               setData(null);
            }
         } catch (error: unknown) {
            setError(error as Error);
            setStatus("error");
            setData(null);
         }
      }

      getUser().then();
      // eslint-disable-next-line
   }, []);

   return { data, error, status };
}
