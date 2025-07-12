// src/app/register/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/authOptions";
import { redirect } from "next/navigation";
import RegisterForm from "../components/register/Register";

export default async function RegisterPage() {
    const session = await getServerSession(authOptions);

    if (session) {
        redirect("/dashboard");
    }

    return <RegisterForm />;
}
