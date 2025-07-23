'use client'
import axios, { AxiosError } from 'axios'
import React, { useState } from 'react'
import { useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { ApiResponse } from '@/types/ApiResponse'
import Navbar from '@/components/Navbar'
import { Textarea } from '@/components/ui/textarea'
import { Separator } from '@/components/ui/separator'
import { Card, CardContent } from '@/components/ui/card'
import messages from '@/messages.json'
import { Skeleton } from '@/components/ui/skeleton'
import Footer from '@/components/Footer'

const U = () => {
  
  const params = useParams()
  const {username} = params
  const [content, setContent] = useState('')
  const [suggestMesssage, setSuggestMessage] = useState(messages)
  const [isLoading, setIsLoading] = useState(false)

  const sendMessages = async () => {
    try {
      const response = await axios.post<ApiResponse>('/api/send-message',{
      username:username,
      content:content
    })
    toast.success(response.data.message)
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>
      toast.error(axiosError.response?.data.message)
      
    }

  }


  const suggestMesssages = async () => {
    
    try {
      setIsLoading(true)
      const response = await axios.post('/api/suggest-messages')
      const result = response.data.result
      const parts = result.split("||");
       setSuggestMessage(parts)
      
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>
      toast.error(axiosError.response?.data.message)
      
    }
    finally {
      setIsLoading(false)
    }
  }

  const setMessage = async (message: string) => {
    setContent(message)
  }
  return (
    <>
    <Navbar/>
    <div className='w-full mt-3 min-h-screen bg-gray-100'>
      <div className='p-8 space-y-8 bg-white rounded lg shadow-md'>
        <div className='flex flex-col gap-2 items-center justify-center'>
      <h1 className='text-3xl font-extrabold tracking-tight lg:text-4xl mb-6'>Send Message to {username} anonymously</h1>
      <Textarea className='w-full max-w-lg' placeholder='Type Your Message...' value={content} onChange={(e) => setContent(e.target.value)}/>
      <Button onClick={sendMessages}>Send</Button>
      </div>
       <Separator/>
       <div className='flex flex-col items-center justify-center'>
        <h1 className='text-2xl font-bold tracking-tight lg:text-3xl mb-6'>Suggestions</h1>
        <Button onClick={suggestMesssages}>Suggest Messages</Button>
        { isLoading ?
        (
          <>
          <Skeleton className='w-lg h-20  max-w-lg mt-3'/>
           <Skeleton className='w-lg h-20  max-w-lg mt-3'/>
            <Skeleton className='w-lg h-20  max-w-lg mt-3'/>
            </>
           
        ): (
         suggestMesssage.map((message, index) => (
            <Card className='w-full max-w-lg mt-3 hover:border-gray-400 border-gray-300 shadow-md' key={index} onClick={() => setMessage(message)}>
              <CardContent>
                <p>{message}</p>
              </CardContent>
            </Card>
            ))
        )
      }
      </div>
      

      </div> 
  
    </div>
    <Footer />
    </>
  )
}

export default U
