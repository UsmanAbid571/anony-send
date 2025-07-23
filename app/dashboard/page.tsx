'use client'
import Footer from '@/components/Footer'
import MessageCard from '@/components/MessageCard'
import Navbar from '@/components/Navbar'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'
import { Message, User } from '@/model/User'
import { acceptMessageSchema } from '@/schemas/acceptMessageSchema'
import { ApiResponse } from '@/types/ApiResponse'
import { zodResolver } from '@hookform/resolvers/zod'
import axios, { AxiosError } from 'axios'
import { Loader2, RefreshCcw } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

const Dashboard = () => {
  const router = useRouter()
  const [messages,setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isSwitchLoading, setIsSwitchLoading] = useState(false)
  const [profileUrl, setProfileUrl] = useState('')
  const handleDeleteMessage = async (messageId: string) => {
    setMessages(messages.filter((message) => message._id !== messageId))
  }

  const {data:session} = useSession()
  const form = useForm({
    resolver: zodResolver(acceptMessageSchema),

  })
  const { watch, setValue, register } = form
  const acceptMessages = watch('acceptMessages')

  const fetchAcceptMessage = useCallback(async ()=>{
    setIsSwitchLoading(true)
    setIsLoading(true)
    try {
      const response = await axios.get('/api/accept-message')
      setValue('acceptMessages',response.data.isAcceptingMessages)

    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>
      toast.error(axiosError.response?.data.message || 'Something went wrong')

      
    }
    finally{
      setIsSwitchLoading(false)
    }

  },[setValue])


  const fetchMessages = useCallback(async (refresh:boolean=false)=>{
    setIsLoading(true)
    setIsSwitchLoading(false)
    try {
      const response = await axios.get<ApiResponse>('/api/get-messages')
      setMessages(response.data.messages || [])
      if(refresh){
        toast.success('Messages Refreshed')

      }   
     } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>
      toast.error(axiosError.response?.data.message || 'Something went wrong')
    }
    finally{
      setIsLoading(false)
      setIsSwitchLoading(false)
    }},[setIsLoading, setMessages])

    useEffect(() => {
      // if(!session || !session.user) return 
       fetchAcceptMessage() 
       fetchMessages()
      
    },[session, setValue, fetchAcceptMessage,fetchMessages])

  // handle switch change
  const handleSwitchChange = async () => {
    try {
      const response = await axios.post<ApiResponse>(`/api/accept-message`,{
      acceptMessages: !acceptMessages

    })
    setValue('acceptMessages', !acceptMessages)
    toast.success(response.data.message)
      
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>
      toast.error(axiosError.response?.data.message || 'Something went wrong')
      
    }
    
  }

  const username = (session?.user as User)?.username;

  useEffect(() => {
    if (typeof window !== 'undefined' && username) {
      const baseUrl = `${window.location.protocol}//${window.location.host}`
      setProfileUrl(`${baseUrl}/u/${username}`)
    }
  }, [username])
  


  const copyToClipboard = () => {
    navigator.clipboard.writeText(profileUrl)
    toast.success('Copied to clipboard')
  }
  if(!session || !session.user){
    router.replace('/sign-in')
    return toast.error('Please Login')
  }
    
  
  return (
    <div>
      <Navbar/>
      <div className="flex mt-3 min-h-screen bg-gray-100">
        <div className="w-full p-8 space-y-8 bg-white rounded lg shadow-md">
          <h1 className='text-4xl font-extrabold tracking-tight lg:text-5xl mb-6'>Dashboard</h1>
          <div className='mb-4'>
            <p>Copy Your Unique Link </p>{''}
            <div className='flex items-center '>
              <input
                type="text"
                value={profileUrl}
                disabled
                className='input input-bordered w-full p-2 mr-2'/>
                <Button onClick={copyToClipboard}>Copy</Button>
            </div>
          </div>
          <Separator/>
          <div className='mb-4 flex gap-2 items-center'>
            <Label>Accept Messages</Label>
            <Switch 
            {...register('acceptMessages')}
            checked={acceptMessages}
            onCheckedChange={handleSwitchChange}
            disabled={isSwitchLoading}
            />
          </div>
          <div>
            <Button className='mt-4'
            variant='outline'
            onClick={(e) => {
              e.preventDefault()
              fetchMessages(true)
            }}>{
              isLoading ? <Loader2 className='animate-spin h-4 w-4'/> : <RefreshCcw className='h-4 w-4'/>}

            </Button>
          </div>
          <div className='mt-4 grid grid-cols-1 md:grid-cols-2 gap-6'>
            {messages.length > 0 ? (
              messages.map((message) => (
                console.log(message),
                <MessageCard key={message._id} message={message} onMessageDelete={handleDeleteMessage}/>
              ))
              
            ) : (
              <p>No messages found.</p>
            )}
            
          </div>
    

        </div>
    </div>
    <Footer/>
    </div>
  )
}

export default Dashboard
