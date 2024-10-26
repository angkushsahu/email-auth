import { useEffect, useState } from "react";

export function useGetUser() {
   const [status, setStatus] = useState<"loading" | "error" | "success" | "idle">("idle");
   const [error, setError] = useState<Error | null>(null);
   const [data, setData] = useState<unknown | null>(null);

   useEffect(() => {
      async function getUser() {
         try {
            setStatus("loading");

            const response = await fetch("/api/user");
            const data = await response.json();
            setData(data);

            setStatus("success");
         } catch (error: unknown) {
            setError(error as Error);
            setStatus("error");
         }
      }

      getUser();
   }, []);

   return { data, error, status };
}
