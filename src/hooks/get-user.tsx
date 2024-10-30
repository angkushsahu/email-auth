"use client";

import { useEffect, useState } from "react";

import type { Response, User } from "@/types";

export function useGetUser() {
   const [status, setStatus] = useState<"loading" | "error" | "success">("loading");
   const [error, setError] = useState<Error | null>(null);
   const [data, setData] = useState<User | null>(null);

   useEffect(() => {
      async function getUser() {
         try {
            if (status !== "loading") setStatus("loading");

            const response = await fetch("/api/user");
            const data: Response = await response.json();

            if (data?.success) {
               setStatus("success");
               setData(data.user);
            } else setStatus("error");
         } catch (error: unknown) {
            setError(error as Error);
            setStatus("error");
         }
      }

      getUser().then();
   }, []);

   return { data, error, status };
}
