import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/authOptions";
import { connectDB } from "@/libs/mongodb";
import Backlog from "@/models/backlog";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await connectDB();

  try {
    const items = await Backlog.find({ userId: session.user.id });
    return NextResponse.json(items);
  } catch (error) {
    return NextResponse.json({ message: "Error fetching backlog", error }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await connectDB();

  try {
    const { title, description, status = "todo" } = await req.json();

    if (!title || typeof title !== "string") {
      return NextResponse.json({ message: "Title is required" }, { status: 400 });
    }

    const newItem = await Backlog.create({
      userId: session.user.id,
      title,
      description: description || "",
      status,
    });

    return NextResponse.json(newItem, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error creating backlog item", error }, { status: 500 });
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

    const result = await Backlog.deleteOne({ _id: id });
    if (result.deletedCount === 0) {
      return NextResponse.json({ message: "Item no encontrado" }, { status: 404 });
    }

    // 204 No Content porque no devolvemos body
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("Error en DELETE:", error);
    return NextResponse.json({ message: "Error deleting backlog item", error }, { status: 500 });
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

    const updated = await Backlog.findByIdAndUpdate(
      _id,
      { title, description, status },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json({ message: "Item no encontrado" }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ message: "Error al actualizar", error }, { status: 500 });
  }
}
