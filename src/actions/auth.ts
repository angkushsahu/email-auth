"use server";

import { cookies } from "next/headers";

import { encrypt } from "@/lib/session";
import type { User } from "@/types";

const user = {
   name: "",
};

export async function loginAction(user: User) {
   const expiryDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
   const token = await encrypt({ user, expiresAt: expiryDate });
   cookies().set("session", token, { maxAge: expiryDate.getTime() });
}

export async function logout() {
   cookies().delete("session");
}
