import { NextResponse } from "next/server";
import User from "@/models/user";
import bcrypt from "bcryptjs";
import { connectDB } from "@/libs/mongodb";

export async function POST(req:Request){
    const {username, password, email} = await req.json()
    
    if(!username || !email || !password) return NextResponse.json({message:"Invalid fields"}, {status:400})
    
    if (username.length < 3) {
        return NextResponse.json({message:"Username too short"}, {status:400})
    }

    if (password.length < 8) {
        return NextResponse.json({message:"Password too short"}, {status:400})
    }
    if (!/^[a-zA-Z0-9]+$/.test(username)) {
        return NextResponse.json({message:"Invalid username"}, {status:400})
    }

    try{
        await connectDB();
        const userFound = await User.findOne({email});
    
        if(userFound) return NextResponse.json({message:"Already exists an account with this email"}, {status:400});
    
        const hashedPassword = await bcrypt.hash(password, 12);
    
        const user = new User({
            username,
            password:hashedPassword,
            email
        });
        const savedUser = await user.save();
        return NextResponse.json(savedUser);
    }
    catch(err){
        console.log(err);
        return NextResponse.error();
    }
}