"use client"

import React from 'react'
import * as z from "zod"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form, FormControl, FormField,
  FormItem, FormLabel, FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { API_BASE_URL } from "@/constant/constant"
import axios from 'axios'
import Link from 'next/link'


const FormSchema = z.object({
  email: z.string().email(),
  username: z.string(),
  password: z.string().min(6, {
    message: "Password must be 6 character"
  }),
  passwordConfirm: z.string()
}).refine((data) => {
  return data.password === data.passwordConfirm
}, {
  message: "Passwords do not match",
  path: ["passwordConfirm"]
})

export default function LoginForm() {
  const router = useRouter()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
      passwordConfirm: ""
    }
  })

  const isLoading = form.formState.isSubmitting
  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    
    try {
      await axios.post(`${API_BASE_URL}/login`, values)
      form.reset()
      router.push("/")
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}
          className="max-w-md w-full flex flex-col gap-4">
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => {
              return <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    placeholder='email'
                    type='email'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            }}
          />
          <FormField
            control={form.control}
            name='username'
            render={({ field }) => {
              return <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    placeholder='username'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            }}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => {
              return <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    placeholder='password'
                    type='password'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            }}
          />
          <FormField
            control={form.control}
            name='passwordConfirm'
            render={({ field }) => {
              return <FormItem>
                <FormLabel>Password confirm</FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    placeholder='password confirm'
                    type='password'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            }}
          />
          <Button type='submit' className='w-full'>
            Submit
          </Button>
          <p className='text-sm text-zinc-500'>If you are a new user create a/c first <Link href="/sign-up" className="text-rose-400 font-semibold">
            Sign-up
          </Link>
          </p>
        </form>
      </Form>
    </main>
  )
}
