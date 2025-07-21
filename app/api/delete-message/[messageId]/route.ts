import { dbConnect } from "@/lib/dbConnect";
import { authOptions } from "../../auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import UserModel from "@/model/User";
import { User } from "next-auth";


export async function DELETE(request: Request, {params}:{params:{messageId:string}}) {
     await dbConnect()

    const session = await getServerSession( authOptions )
    const messageId = params.messageId
    const user: User = session?.user 

    // Check if the user or session is available
    if(!session || !user) {
        return Response.json(
            {
                success: false,
                message: "Unauthorized"
            },
            {
                status: 401
            })
    }

    try {
        const updateResult = await UserModel.updateOne(
            {_id:user._id},
            {$pull: {messages:{_id:messageId}}}
        )
        if(updateResult.modifiedCount == 0){
            return Response.json(
                {
                    success:false,
                    message: 'Message not found or already deleted'
                },
                {
                    status: 404
                }
            )
        }
        return Response.json(
                {
                    success:true,
                    message: 'Message Deleted'
                },
                {
                    status: 200
                }
            )

    } catch (error) {
        console.error('Error deleting messages',error)
        return Response.json(
                {
                    success:false,
                    message: 'Error deleting messages'
                },
                {
                    status: 500
                }
            )
        
    }
   

        
    }
