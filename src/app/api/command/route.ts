import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/authOptions";
import { connectDB } from "@/libs/mongodb";
import Command from "@/models/command";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await connectDB();

try {
    const commands = await Command.find({ userId: session.user.id });
    return NextResponse.json(commands);
  } catch (error) {
    return NextResponse.json({ message: "Error fetching commands", error }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await connectDB();
  console.log("parada tecnica")

  try {
    const { command } = await req.json();

    if (!command || typeof command !== "string") {
      return NextResponse.json({ message: "command is required" }, { status: 400 });
    }

    const newCommand = await Command.create({
      userId: session.user.id,
      command
    });

    return NextResponse.json(newCommand, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error creating command", error }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  await connectDB();

  try {
    const { id } = await req.json();

    const result = await Command.deleteOne({ _id: id });
    if (result.deletedCount === 0) {
      return NextResponse.json({ message: "Item no encontrado" }, { status: 404 });
    }

    // 204 No Content porque no devolvemos body
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("Error en DELETE:", error);
    return NextResponse.json({ message: "Error deleting command item", error }, { status: 500 });
  }
}