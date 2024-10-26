import { z } from "zod";

export const loginSchema = z.object({
   email: z.string().min(1, { message: "Required field" }).email({ message: "Please enter a valid email address" }),
});

export const registerSchema = loginSchema.merge(
   z.object({
      name: z.string().min(1, { message: "Required field" }),
   })
);

export type RegisterType = z.infer<typeof registerSchema>;
export type LoginType = z.infer<typeof loginSchema>;
