import mongoose from "mongoose";


type ConnectionObject = {
    isConnected?: number
}


const connection: ConnectionObject = {}

export async function dbConnect(): Promise<void> {
    if(connection.isConnected) {
        return
    }
    const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.error("MONGODB_URI is not defined in environment variables.");
    process.exit(1);
  }

    try{
        const db = await mongoose.connect(uri || '')
        connection.isConnected = db.connections[0].readyState

        console.log('db connected')
    }

    catch(error){
        console.log(error, "database connection failed")
        process.exit(1)

    }
    
}