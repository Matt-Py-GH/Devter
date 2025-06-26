import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { connectDB } from "@/libs/mongodb";
import UserMetadata from "@/models/userMetadata";
import User from "@/models/user";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  await connectDB();

  const user = await User.findOne({ email: session.user.email }).select("_id");
  if (!user) {
    return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
  }

  let metadata = await UserMetadata.findOne({ userId: user._id });
  if (!metadata) {
    metadata = new UserMetadata({ userId: user._id, projectTitle: "" });
    await metadata.save();
  }

  return NextResponse.json({ projectTitle: metadata.projectTitle });
}

export async function PATCH(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  const { projectTitle } = await req.json();
  if (typeof projectTitle !== "string") {
    return NextResponse.json({ error: "Título inválido" }, { status: 400 });
  }

  await connectDB();

  const user = await User.findOne({ email: session.user.email }).select("_id");
  if (!user) {
    return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
  }

  let metadata = await UserMetadata.findOne({ userId: user._id });
  if (!metadata) {
    metadata = new UserMetadata({ userId: user._id, projectTitle: "" });
  }

  metadata.projectTitle = projectTitle;
  await metadata.save();

  return NextResponse.json({ message: "Guardado" });
}
