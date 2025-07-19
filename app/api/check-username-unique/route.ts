import { z } from "zod"
import { dbConnect } from "@/lib/dbConnect"
import UserModel from "@/model/User"
import { usernameValidation } from "@/schemas/signUpSchema"

const usernameQuerySchema = z.object({
    username: usernameValidation,
})


export async function GET(request: Request) {
    await dbConnect()

    try {
        const { searchParams } = new URL(request.url)
        const queryParam = {
            username: searchParams.get('username')
        }
        // Validate with zod

        const result = usernameQuerySchema.safeParse(queryParam)
        if(!result.success){
            const usernameErrors = result.error.format().
            username?._errors || []
            return Response.json(
                { 
                    success: false,
                    message: "Invalid username",
                    errors: usernameErrors
                },
                {
                    status: 400
                }  
            )
        }
        const { username } = result.data

        // Check if the username is already taken
        const existingVerifiedUser = await UserModel.findOne({ username, isVerified: true })
        if (existingVerifiedUser) {
            return Response.json(
                { 
                    success: false,
                    message: "Username already taken" 
                },
                {
                    status: 400
                }
            )
        }
        return Response.json({ 
            success: true,
            message: "Username is available"
        })

        
    } catch (error) {
        console.error(error, "checking username failed")
        return Response.json(
            { 
                success: false,
                message: "Failed to check username" 
            },
            {
                status: 500
            }
        )
        
    }
}