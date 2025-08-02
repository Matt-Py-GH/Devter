import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/authOptions";
import { redirect } from "next/navigation";
import RegisterForm from "../components/register/Register";

// SEO metadata
export const generateMetadata = (): Metadata => ({
    title: "Registrarse | Devter",
    description: "Registrate en Devter para acceder a tus herramientas de desarrollo.",
    alternates: {
        canonical: "https://devter.dev/register",
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
        url: "https://devter.dev/register",
        siteName: "Devter",
        type: "website",
        images: [
            {
                url: "https://devter.dev/og-image.png",
                width: 1200,
                height: 630,
                alt: "Devter register",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Registrarse | Devter",
        description: "Regístrate en Devter para acceder a tus herramientas de desarrollo.",
        images: ["https://devter.dev/og-image.png"],
        creator: "@_Mateo_Delgado",
    },
});

export default async function RegisterPage() {
    const session = await getServerSession(authOptions);

    if (session) {
        redirect("/dashboard");
    }

    return <RegisterForm />;
}
