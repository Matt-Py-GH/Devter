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
        nocache: false,
        googleBot: {
            index: true,
            follow: true,
        },
    },
    openGraph: {
        title: "Iniciar sesión | Devter",
        description: "Inicia sesión en Devter para acceder a tus herramientas de desarrollo.",
        url: "https://devter.dev/login",
        siteName: "Devter",
        type: "website",
        images: [
            {
                url: "https://devter.dev/og-image.png",
                width: 1200,
                height: 630,
                alt: "Devter Login",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Iniciar sesión | Devter",
        description: "Inicia sesión en Devter para acceder a tus herramientas de desarrollo.",
        images: ["https://devter.dev/og-login.png"],
        creator: "@_Mateo_Delgado",
    },
});



export default async function LoginPage() {
    const session = await getServerSession(authOptions);

    if (session) {
        redirect("/dashboard");
    }

    return <LoginForm />;
}
