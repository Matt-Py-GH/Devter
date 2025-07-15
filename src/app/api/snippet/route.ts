import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/authOptions";
import { connectDB } from "@/libs/mongodb";
import Snippet from "@/models/snip";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await connectDB();

  try {
    const snippets = await Snippet.find({ userId: session.user.id });
    return NextResponse.json(snippets);
  } catch (error) {
    return NextResponse.json({ message: "Error fetching Snippet", error }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await connectDB();

  try {
    const { title, description, code } = await req.json();

    if (!title || typeof title !== "string") {
      return NextResponse.json({ message: "Title is required" }, { status: 400 });
    }

    const newSnippet = await Snippet.create({
      userId: session.user.id,
      title,
      description: description || "",
      code : code || "",
    });

    return NextResponse.json(newSnippet, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error creating Snippet item", error }, { status: 500 });
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

    const result = await Snippet.deleteOne({ _id: id });
    if (result.deletedCount === 0) {
      return NextResponse.json({ message: "Snippet no encontrado" }, { status: 404 });
    }

    // 204 No Content porque no devolvemos body
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("Error en DELETE:", error);
    return NextResponse.json({ message: "Error deleting Snippet item", error }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await connectDB();

  try {
    const { _id, title, description, code } = await req.json();

    const updated = await Snippet.findByIdAndUpdate(
      _id,
      { title, description, code },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json({ message: "Snippet no encontrado" }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ message: "Error al actualizar", error }, { status: 500 });
  }
}
