import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { dbConnect } from "@/lib/dbConnect";
import userModel from "@/model/User";
import { User } from "next-auth";


export async function POST(request:Request) {
    await dbConnect()

    const session = await getServerSession( authOptions )
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

    const userId = user._id
    const { acceptMessages } = await request.json()

    try {
        const updatedUser = await userModel.findByIdAndUpdate(
            userId, 
            { isAcceptingMessages: acceptMessages },
            {new: true}
        )
        if(!updatedUser) {
            return Response.json(
                {
                    success: false,
                    message: "User not found"
                },
                {
                    status: 404
                }
            )
        }
        return Response.json(
            {
                success: true,
                message: "User message accepting updated successfully",
                updatedUser
            },
            {
                status: 200
            }
        )

        
    } catch (error) {
        console.error(error, "Error updating user for accepting messages")
        return Response.json({
            success: false,
            message: "Error updating user for accepting messages"
        },
        {
            status: 500
        }
    )
    }
}


export async function GET(request:Request) {
    await dbConnect()

    const session = await getServerSession( authOptions )
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

    const userId = user._id
    const foundUser = await userModel.findById(userId)

    try {
        if(!foundUser) {
        return Response.json(
            {
                success: false,
                message: "User not found"
            },
            {
                status: 404
            }
        )
    }

    return Response.json(
        {
            success: true,
            message: "User found successfully",
            isAcceptingMessages: foundUser.isAcceptingMessages
        },
        {
            status: 200
        }
    )
        
    } catch (error) {
        console.error(error, "Error finding user for accepting messages")
        return Response.json({
            success: false,
            message: "Error finding user for accepting messages"
        },
        {
            status: 500
        }
)}
        
    }
    

    
