"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input } from "@/components";
import { loginSchema, type LoginType } from "@/validations";
import { loginAction } from "@/actions/auth";

export function LoginForm() {
   const loginForm = useForm<LoginType>({
      resolver: zodResolver(loginSchema),
      defaultValues: { email: "" },
   });

   async function onLogin(values: LoginType) {
      const user = {
         name: "Angkush Sahu",
         email: "angkushsahu2502@gmail.com",
         joinedOn: "23rd September, 2024",
         id: "6234kj324ksdf9234",
      };
      const sendMailAction = loginAction.bind(null, user);
      await sendMailAction();
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
