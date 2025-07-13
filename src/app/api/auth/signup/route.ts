import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/models/user";
import { connectDB } from "@/libs/mongodb";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidUsername(username: string) {
  return /^[a-zA-Z0-9]+$/.test(username) && username.length >= 3;
}

export async function POST(req: Request) {
  try {
    const { username, password, email } = await req.json();

    if (!username || !email || !password) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    if (!isValidUsername(username)) {
      return NextResponse.json({ message: "Invalid or too short username" }, { status: 400 });
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({ message: "Invalid email format" }, { status: 400 });
    }

    if (password.length < 8) {
      return NextResponse.json({ message: "Password must be at least 8 characters" }, { status: 400 });
    }

    await connectDB();

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return NextResponse.json({ message: "Email is already in use" }, { status: 400 });
    }

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return NextResponse.json({ message: "Username is already taken" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      username,
      email,
      password: hashedPassword
    });

    const savedUser = await newUser.save();

    return NextResponse.json({
      id: savedUser._id,
      username: savedUser.username,
      email: savedUser.email
    });
  } catch (error) {
    console.error("Error in register:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
