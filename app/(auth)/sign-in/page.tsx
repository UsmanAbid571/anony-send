'use client'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import Link from "next/link"
import { z } from "zod"
import { useState} from "react"

import { toast } from "sonner"
import { useRouter } from "next/navigation"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { signInSchema } from "@/schemas/signInSchema"
import { signIn } from "next-auth/react"




const SignIn = () => {
 
  const [ isSubmiting, setIsSubmiting] = useState(false)
  const router = useRouter()

  // zod implementation for validation
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues:{
      identifier: '',
      password: '' 
    }
  })
 

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    setIsSubmiting(true)
    const result = await signIn('credentials',{
      identifier: data.identifier,
      password: data.password
    })
    if(result?.error){
      toast.error('Login Failed: Incorrect username or password')
    }
    if(result?.url){
      router.replace(`/dashboard`)
    }

    
  }
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 rounded-lg shadow-md border bg-white">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">Sign In</h1>
          <p className="mb-4">Sign in to have start anoymous experience</p>
        </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
         
        <FormField
          control={form.control}
          name="identifier"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="email/username" {...field} />
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
                <Input type="password" placeholder="password" {...field}/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <Button type="submit" >
          {
            isSubmiting ? (
              <>
                <span>Signing in...</span>
                {/* <Loader2 className="animate-spin mr-2 h-4 w-4" /> */}
                </>
            ) : ( 'Sign In' )
          }
          </Button>

        </form>

      </Form>
      <div className="text-center mt-4">
        <p>
          Dont have an account? <Link href="/sign-up" className="text-blue-600 hover:text-blue-800">Sign Up</Link>
        </p>
      </div>
      </div>
      
    </div>
  )
}

export default SignIn
