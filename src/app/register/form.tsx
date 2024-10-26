"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input } from "@/components";
import { registerSchema, type RegisterType } from "@/validations";

export function RegisterForm() {
   const registerForm = useForm<RegisterType>({
      resolver: zodResolver(registerSchema),
      defaultValues: { email: "", name: "" },
   });

   function onRegister(values: RegisterType) {
      console.log(values);
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
