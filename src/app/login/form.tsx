"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input } from "@/components";
import { loginSchema, type LoginType } from "@/validations";

export function LoginForm() {
   const loginForm = useForm<LoginType>({
      resolver: zodResolver(loginSchema),
      defaultValues: { email: "" },
   });

   function onLogin(values: LoginType) {
      console.log(values);
   }

   return (
      <Form {...loginForm}>
         <form onSubmit={loginForm.handleSubmit(onLogin)} className="space-y-4">
            <FormField
               control={loginForm.control}
               name="email"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>E-mail</FormLabel>
                     <FormControl>
                        <Input type="email" placeholder="e.g. johndoe@gmail.com" {...field} />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <div className="flex items-center justify-end pt-2">
               <Button type="submit">Login Now</Button>
            </div>
         </form>
      </Form>
   );
}
