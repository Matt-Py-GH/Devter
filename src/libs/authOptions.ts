import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "@/libs/mongodb";
import User from "@/models/user";
import bcrypt from "bcryptjs";

type CustomUser = {
  id: string;
  email: string;
  username: string;
};

const INVALID_CREDENTIALS = "Invalid credentials";

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error(INVALID_CREDENTIALS);
        }

        await connectDB();

        const user = await User.findOne({ email: credentials.email }).select("+password");
        if (!user) throw new Error(INVALID_CREDENTIALS);

        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) throw new Error(INVALID_CREDENTIALS);

        return {
          id: user._id.toString(),
          username: user.username,
          email: user.email,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = {
          id: user.id || "",
          name: (user as CustomUser).username,
          email: user.email || "unknownemail",
        };
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
    newUser: "/register",
  },
};
