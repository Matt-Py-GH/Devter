// src/app/login/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/authOptions";
import { redirect } from "next/navigation";
import LoginForm from "../components/login/Login";

export default async function LoginPage() {
    const session = await getServerSession(authOptions);

    if (session) {
        redirect("/dashboard");
    }

    return <LoginForm />;
}
