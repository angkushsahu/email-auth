import "@/styles/globals.css";

import type { Metadata } from "next";

import type { Children } from "@/types";
import { Toaster } from "@/components";

export const metadata: Metadata = {
   title: "E-mail only authentication",
   description: "E-mail only authentication",
};

export default function RootLayout({ children }: Children) {
   return (
      <html lang="en">
         <body className="flex min-h-screen flex-col font-sans antialiased">
            <main className="flex grow flex-col">{children}</main>
            <Toaster />
         </body>
      </html>
   );
}
