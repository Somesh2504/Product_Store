import mongoose from 'mongoose'
import dotenv from 'dotenv';

dotenv.config();

export const dbconnect =async ()=>{
    try {
      
        const connection=mongoose.connect(process.env.MONGO_URI)
        console.log('mongoDb connected ')
    } catch (error) {
        console.log(`Error : ${error.message}`)
        process.exit(1)
    }
}