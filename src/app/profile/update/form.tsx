"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input } from "@/components";
import { registerSchema, type RegisterType } from "@/validations";
import type { Response } from "@/types";
import { toast } from "@/hooks";

type UpdateFormProps = RegisterType & { _id: string };

export function UpdateForm(props: UpdateFormProps) {
   const updateForm = useForm<RegisterType>({
      resolver: zodResolver(registerSchema),
      defaultValues: { email: props.email, name: props.name },
   });

   async function onUpdate(values: RegisterType) {
      try {
         const response = await fetch(`/api/user/${props.email}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
         });
         const data: Response = await response.json();

         if (!data.success) return toast({ title: data.message, variant: "destructive" });

         toast({ title: data.message });
      } catch (error: unknown) {
         let message = "Some error occurred";
         if (error instanceof Error) message = error.message;
         toast({ title: message, variant: "destructive" });
      }
   }

   return (
      <Form {...updateForm}>
         <form onSubmit={updateForm.handleSubmit(onUpdate)} className="space-y-4">
            <FormField
               control={updateForm.control}
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
               control={updateForm.control}
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
               <Button type="submit">Update Now</Button>
            </div>
         </form>
      </Form>
   );
}
