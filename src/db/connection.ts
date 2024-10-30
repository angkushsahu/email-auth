import "server-only";

import { connect, type Mongoose } from "mongoose";

const globalForDb = globalThis as unknown as {
   conn: Mongoose | null | undefined;
};

export async function connectDatabase() {
   if (globalForDb.conn) return globalForDb.conn;
   if (!process.env.DATABASE_URL) throw new Error("Please specify environment variable: DATABASE_URL");

   try {
      globalForDb.conn = await connect(process.env.DATABASE_URL);
      return globalForDb.conn;
   } catch {
      return null;
   }
}
