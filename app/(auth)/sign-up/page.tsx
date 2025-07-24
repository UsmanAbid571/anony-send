'use client'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import Link from "next/link"
import { z } from "zod"
import { useState } from "react"

import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { signUpSchema } from "@/schemas/signUpSchema"
import axios from "axios"
import { ApiResponse } from "@/types/ApiResponse"
import { AxiosError } from "axios"
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




const SignUp = () => {
  const [ username, setUsername ] = useState('')
  const [ isSubmiting, setIsSubmiting] = useState(false)
  const router = useRouter()

  // zod implementation for validation
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues:{
      username: '',
      email: '',
      password: '' 
    }
  })
  

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    setIsSubmiting(true)
    try {
      const response =await axios.post<ApiResponse>('/api/sign-up', data)
      toast.success(response.data.message)
      router.replace(`/verify/${username}`)
        
      
    } catch (error) {
      console.error(error)
      const axiosError = error as AxiosError<ApiResponse>
      toast.error(axiosError.response?.data.message)
    }
    finally{
      setIsSubmiting(false)
    }

    
  }
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 rounded-lg shadow-md border bg-white">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">Join Anony Send</h1>
          <p className="mb-4">Sign up to have some anoymous experience</p>
        </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="username" {...field} 
                onChange={(e) => {
                  field.onChange(e)
                  setUsername(e.target.value)}}/>
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
                <Input placeholder="example@example.com" {...field} />
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
         <Button type="submit" disabled={isSubmiting}>
          {
            isSubmiting ? (
              <>
                <span>Signing up...</span>
                {/* <Loader2 className="animate-spin mr-2 h-4 w-4" /> */}
                </>
            ) : ( 'Sign Up' )
          }
          </Button>

        </form>

      </Form>
      <div className="text-center mt-4">
        <p>
          Already have an account? <Link href="/sign-in" className="text-blue-600 hover:text-blue-800">Sign In</Link>
        </p>
      </div>
      </div>
      
    </div>
  )
}

export default SignUp
