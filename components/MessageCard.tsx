import React from 'react'
import { X } from 'lucide-react'
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from './ui/button'
import { Message } from '@/model/User'
import { ApiResponse } from '@/types/ApiResponse'
import axios from 'axios'
import { toast } from 'sonner'

type MessageCardProps={
    message: Message;
    onMessageDelete: (messageId:string) => void
}

const MessageCard = ({message,onMessageDelete}:MessageCardProps) => {
    const createdAt = new Date(message.createdAt).toLocaleString()
    const handleDeleteConfirm = async () =>{
        const response = await axios.delete<ApiResponse>(`/api/delete-message/${message._id}`)
        toast.success(response.data.message)
        onMessageDelete(message._id)
    }
  return (
    <div>
        <Card>
            <CardHeader>
                <CardTitle>{message.content}</CardTitle>
                <CardDescription>{createdAt}</CardDescription>
                <CardAction><AlertDialog>
            <AlertDialogTrigger>
                <Button variant="ghost"><X className='w-5 h-5'/></Button>
                </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your message
                    and remove your data from our servers.
                </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDeleteConfirm}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
            </AlertDialog>
            </CardAction>
            </CardHeader>
           
    </Card>
    </div>
  )
}

export default MessageCard
