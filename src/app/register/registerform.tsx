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
import { RegisterBody, RegisterBodyType } from "@/schemaValidations/auth.schema"
import Link from "next/link"
import envConfig from "@/config"
import { useEffect } from "react"



const RegisterForm = () => {

  console.log(process.env.NEXT_PUBLIC_API_ENDPOINT)
    const form = useForm< RegisterBodyType>({
        resolver: zodResolver(RegisterBody),
        defaultValues: {
          email: '',
          name: '',
          password:'',
          confirmPassword:''
        },
      })

      async function onSubmit(values: RegisterBodyType) {
          const result = await fetch('${envConfig.NEXT_PUBLIC_API_ENDPOINT}/auth/register',{
          body: JSON.stringify(values),
          headers: {
            'Content-Type': 'application/json'
          },
          method:'POST'
        }).then((res) => res.json())
        console.log(result)
      }
    return  ( <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 max-w-[400px] flex-shrink-0 w-full" noValidate>
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input placeholder="Your name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

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
      <FormField
        control={form.control}
        name="confirmPassword"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Confirm Password</FormLabel>
            <FormControl>
              <Input placeholder="Your password" type="password" {...field} />
            </FormControl>
       
            <FormMessage />
          </FormItem>
        )}
      />
      <Button type="submit" className="!mt-8 w-full">Register</Button>
      <Link className="!mt-8 w-full" href="/login">Login</Link>
    </form>
       
    
  </Form>)
}
export default RegisterForm