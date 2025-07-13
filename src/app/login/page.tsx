// src/app/login/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/authOptions";
import { redirect } from "next/navigation";
import LoginForm from "../components/login/Login";

import type { Metadata } from "next";

export const generateMetadata = (): Metadata => ({
    title: "Iniciar sesión | Devter",
    description: "Inicia sesión en Devter para acceder a tus herramientas de desarrollo.",
    alternates: {
        canonical: "https://devter.dev/login",
    },
    robots: {
        index: true,
        follow: true,
    },

});


export default async function LoginPage() {
    const session = await getServerSession(authOptions);

    if (session) {
        redirect("/dashboard");
    }

    return <LoginForm />;
}
