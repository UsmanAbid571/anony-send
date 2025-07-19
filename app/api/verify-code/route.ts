import { dbConnect } from "@/lib/dbConnect";
import UserModel from "@/model/User";
// import {z} from "zod" // TODO:
// import { usernameValidation } from "@/schemas/signUpSchema";



export async function POST(request:Request){
    await dbConnect()

    try {
        const { username, verifyCode } = await request.json()
        const decodedUsername = decodeURIComponent(username)
        const user = await UserModel.findOne({ username: decodedUsername })

        if(!user){
            return Response.json(
                {
                    success: false,
                    message: "User not found"
                },
                {
                    status: 400
                }
            )
        }
        const isCodeValid = user.verifyCode === verifyCode
        const isCodeNotExpired = user.verifyCodeExpiry > new Date()

        if(isCodeValid && isCodeNotExpired){
            user.isVerified = true
            await user.save()
            return Response.json(
                {
                    success: true,
                    message: "Account verified successfully"
                },
                {
                    status: 200
                }
            )
        }

        else if(!isCodeNotExpired){
             return Response.json(
            {
                success: false,
                message: "Verification code has expired. Please sign up again."
            },
            {
                status: 400
            }
        )
        }
        else{
            return Response.json(
                {
                    success: false,
                    message: "Invalid verification code"
                },
                {
                    status: 400
                }
            )
        }
        
    } catch (error) {
        console.error(error,"Error Verifying User")

        return Response.json(
            {
                success: false,
                message: "Error verifying user"
            },
            {
                status: 400
            }
        )
        
    }
}



