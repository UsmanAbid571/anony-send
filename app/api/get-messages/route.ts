import { dbConnect } from "@/lib/dbConnect";
import { authOptions } from "../auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import UserModel from "@/model/User";
import { User } from "next-auth";
import mongoose from "mongoose";

export async function GET(request: Request) {
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

    const userId = new mongoose.Types.ObjectId(user._id) 
    
    try {
        const user = await UserModel.aggregate([
            { $match:{ _id : userId} },
            { $unwind: "$messages" },
            { $sort : { "messages.createdAt" : -1 } },
            { $group : { _id : "$_id", messages : { $push : "$messages" } } }
        ])
        if(!user || user.length===0){
            return Response.json(
                {
                    success: true,
                    message: "No messages found"
                },
                {
                    status: 200
                }
            )
        }

        return Response.json(
            {
                success: true,
                message: "Messages fetched successfully",
                messages: user[0].messages
            },
            {
                status: 200
            }
        )

        
    } catch (error) {
        console.error(error, "error getting messages")
        return Response.json(
            {
                success: false,
                message: "Error getting messages"
            },
            {
                status: 500
            }
        )
    }
}