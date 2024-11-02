"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input } from "@/components";
import { createUserAndSendMail, registerSchema, type RegisterType } from "@/features/auth";
import { toast } from "@/hooks";

export function RegisterForm() {
   const registerForm = useForm<RegisterType>({
      resolver: zodResolver(registerSchema),
      defaultValues: { email: "", name: "" },
   });

   async function onRegister(values: RegisterType) {
      try {
         const callCreateUser = createUserAndSendMail.bind(null, { email: values.email, name: values.name });
         const { message, user } = await callCreateUser();

         if (!user) toast({ title: message, variant: "destructive" });
         else toast({ title: message });
      } catch (error: unknown) {
         let message = "Some error occurred";
         if (error instanceof Error) message = error.message;
         toast({ title: message, variant: "destructive" });
      }
   }

   return (
      <Form {...registerForm}>
         <form onSubmit={registerForm.handleSubmit(onRegister)} className="space-y-4">
            <FormField
               control={registerForm.control}
               name="name"
               render={({ field }) => (
                  <FormItem>
                     <FormLabel>Name</FormLabel>
                     <FormControl>
                        <Input placeholder="e.g. John Doe" {...field} />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               control={registerForm.control}
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
               <Button type="submit">Register Now</Button>
            </div>
         </form>
      </Form>
   );
}
