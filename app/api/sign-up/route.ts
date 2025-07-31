import {dbConnect} from '@/lib/dbConnect'
import bcrypt from 'bcryptjs'
import UserModel from '@/model/User'

import { sendVerificationEmail } from '@/helpers/sendVerificationEmail'



export async function POST(request:Request){
    await dbConnect()

    try {
        const { username, email, password } = await request.json()
        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString()
        const existingUserVerifiedByUsername = await UserModel.findOne({ 
            username,
            isVerified: true

         })
         if(existingUserVerifiedByUsername){
            return Response.json(
                {
                    success: false,
                    message: "Username already exists"
                },
                {
                    status: 400
                }
            )
         }

         const existingUserByEmail = await UserModel.findOne({
             email
         })
         if(existingUserByEmail){
            if(existingUserByEmail.isVerified){
                return Response.json(
                    {
                        success: false,
                        message: "User already exists with this email."
                    },
                    {
                        status: 400
                    }
                )
            } else{
                const hashedPassword = await bcrypt.hash(password, 10)
                existingUserByEmail.password = hashedPassword
                existingUserByEmail.verifyCode = verifyCode
                existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000)
                await existingUserByEmail.save()

            }
        }else{
            const hashedPassword = await bcrypt.hash(password, 10)
            const expiryDate = new Date()
            expiryDate.setHours(expiryDate.getHours() + 1)

                
            const newUser = await new UserModel({
                   username,
                   email,
                   password: hashedPassword,
                   verifyCode,
                   isVerified: false,
                   verifyCodeExpiry: expiryDate,
                   isAcceptingMessages: true,
                   messages: []
            })
            await newUser.save()
        }

            // Send verification email
            const emailResponse = await sendVerificationEmail(
                email,
                username,
                verifyCode
            )
            if(!emailResponse.success){
                return Response.json(
                    {
                        success: false,
                        message: emailResponse.message || 'Error sending verification Email'
                    },
                    {
                        status: 500
                    }   
                )
            }


            return Response.json(
                {
                    success: true,
                    message: "User registered successfully.Please verify your email"
                },
                {
                    status: 200
                }
            )

         


    } catch (error) {
        console.error(error, "Error registering user")
        return Response.json(
            {
                success: false,
                message: "Failed registering user"
            },
            {
                status: 500
            }
        )
        
    }
}