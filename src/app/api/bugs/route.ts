import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { connectDB } from "@/libs/mongodb";
import Error from "@/models/bugs";

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await connectDB();

  try {
    const bugs = await Error.find({ userId: session.user.id });
    return NextResponse.json(bugs);
  } catch (error) {
    return NextResponse.json({ message: "Error fetching bugs", error }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await connectDB();

  try {
    const { title, description, status = "bug" } = await req.json();

    if (!title || typeof title !== "string") {
      return NextResponse.json({ message: "Title is required" }, { status: 400 });
    }

    const newBug = await Error.create({
      userId: session.user.id,
      title,
      description: description || "",
      status: status || "bug",
    });

    return NextResponse.json(newBug, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error creating Error item", error }, { status: 500 });
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

    const result = await Error.deleteOne({ _id: id });
    if (result.deletedCount === 0) {
      return NextResponse.json({ message: "Bug no encontrado" }, { status: 404 });
    }

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("Error en DELETE:", error);
    return NextResponse.json({ message: "Error deleting bug item", error }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await connectDB();

  try {
    const { _id, title, description, status } = await req.json();

    const updated = await Error.findByIdAndUpdate(
      _id,
      { title, description, status },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json({ message: "Bug no encontrado" }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ message: "Error al actualizar", error }, { status: 500 });
  }
}
