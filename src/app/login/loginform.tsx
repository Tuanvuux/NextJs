"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { LoginBody,  } from "@/schemaValidations/auth.schema"
import Link from "next/link"



const LoginForm = () => {
    const form = useForm<z.infer<typeof LoginBody>>({
        resolver: zodResolver(LoginBody),
        defaultValues: {
          email: '',
         
          password:'',
        
        },
      })
     
      // 2. Define a submit handler.
      function onSubmit(values: z.infer<typeof LoginBody>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
      }
    return  ( <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 max-w-[400px] flex-shrink-0 w-full" noValidate>
      

<FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input placeholder="Your email" type="email" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl>
              <Input placeholder="Your password" type="password" {...field} />
            </FormControl>
                  <FormMessage />
          </FormItem>
        )}
      />
      
      <Button type="submit" className="!mt-8 w-full">Login</Button>
      <Link className="!mt-8 w-full" href="/register">Register</Link>
    </form>
  </Form>)
}
export default LoginForm