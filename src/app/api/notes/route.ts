import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { connectDB } from "@/libs/mongodb";
import Note from "@/models/note";

export async function GET(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    try {
        const notes = await Note.findOne({ user: session.user.id });
        return NextResponse.json(notes);
    } catch (error) {
        return NextResponse.json({ message: "Error fetching notes", error }, { status: 500 });
    }
}

export async function POST(req: Request){
    const session = await getServerSession(authOptions);
    if(!session){
        return NextResponse.json({message : "Unauthorized"}, {status:401})
    }

    await connectDB();

    try{
        const { content } = await req.json()
        if(!content || typeof content !== "string"){
            console.log("no contente");
            return NextResponse.json({ message: "No content" }, { status: 400 });
        }
        const notes = await Note.findOneAndUpdate(
                            { user: session.user.id },
                            { content },
                            { upsert: true, new: true }
                            );
        return NextResponse.json(notes, {status:201})
    
    }catch(error){
        return NextResponse.json({ message: "Error creating command", error }, { status: 500 });
    }
}