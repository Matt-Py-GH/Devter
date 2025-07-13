// src/app/register/page.tsx
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/authOptions";
import { redirect } from "next/navigation";
import RegisterForm from "../components/register/Register";

// SEO metadata
export const generateMetadata = (): Metadata => ({
    title: "Registrarse | Devter",
    description: "Crea tu cuenta gratuita en Devter para organizar tus proyectos como desarrollador.",
    alternates: {
        canonical: "https://devter.dev/register",
    },
});

export default async function RegisterPage() {
    const session = await getServerSession(authOptions);

    if (session) {
        redirect("/dashboard");
    }

    return <RegisterForm />;
}
