import mongoose from "mongoose";

const mongoService =  process.env.mongo_service || '172.17.0.2'
const mongoUserName = process.env.mongo_userName ||'admin'
const mongoPassword = process.env.mongo_password || 'admin'
const mongoPort = process.env.mongo_port || 27017

export const DB =  async ()=>{
    try{
        await mongoose.connect(`mongodb://${mongoUserName}:${mongoPassword}@${mongoService}:${mongoPort}/ballo?authSource=admin`);
        console.log("connected to mongoDB")

    } catch (err){
        console.log(`err in connectiong to the DB : ${err}`)
    }

} 
