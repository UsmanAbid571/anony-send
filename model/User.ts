import mongoose, { Schema ,Document } from "mongoose";



export interface Message extends Document {
       _id: string, 
       content: string,
       createdAt: Date
    }

const MessageSchema: Schema<Message> = new Schema({
    content: { 
        type: String,
        required: true },
    createdAt: { 
        type: Date,
        required: true,
        default: Date.now },
  }
);

export interface User extends Document {
    username: string,
    email: string,
    password: string,
    verifyCode: string,
    isVerified: boolean,
    verifyCodeExpiry: Date,
    isAcceptingMessages: boolean,
    messages: Message[]
}

const UserSchema = new Schema<User>({
    username: { 
        type: String,
        required: [ true, "Username is required" ],
        trim: true,
        unique: true
         },
    email: { 
        type: String,
        required: [ true, "Email is required" ],
        unique:true,
        // rigix pattern for email validation
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please provide a valid email"
        ]
     },
    password: { 
        type: String,
        required: [ true, "Password is required" ]
    },
    verifyCode: {
        type: String,
        required: [ true, "Verify code is required" ]
    },
    verifyCodeExpiry: {
        type: Date,
        required: [ true, "Verify Code Expiry is required" ]
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAcceptingMessages: {
        type: Boolean,
        default: false
    },
    messages: [MessageSchema]
  }
);

const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User", UserSchema);

export default UserModel;