import mongoose from "mongoose";

const {DB_CONNECTION} = process.env;

if(!DB_CONNECTION) throw new Error("ERROR TO CONNECT TO THE DATABASE");

export const connectDB = async () =>{
    try{
        const {connection} = await mongoose.connect(DB_CONNECTION);
        if(connection.readyState === 1){
            console.log("Database connected succesfully!")
            return Promise.resolve(true)
        }

    }catch(err){
        console.log(err);
        return Promise.reject(false)
    }
    
}