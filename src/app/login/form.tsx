"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input } from "@/components";
import { loginSchema, type LoginType } from "@/validations";
import { checkUserAndSendMail } from "@/actions";
import { toast } from "@/hooks";

export function LoginForm() {
   const loginForm = useForm<LoginType>({
      resolver: zodResolver(loginSchema),
      defaultValues: { email: "" },
   });

   async function onLogin(values: LoginType) {
      try {
         const callCheckUserAndSendMail = checkUserAndSendMail.bind(null, values.email);
         const { message, user } = await callCheckUserAndSendMail();

         if (!user) toast({ title: message, variant: "destructive" });
         else toast({ title: message });
      } catch (error: unknown) {
         let message = "Some error occurred";
         if (error instanceof Error) message = error.message;
         toast({ title: message, variant: "destructive" });
      }
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
