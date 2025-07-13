// src/app/profile/page.tsx
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/authOptions";
import { redirect } from "next/navigation";
import ProfileClient from "../clientPages/Profile";

export const generateMetadata = (): Metadata => ({
    title: "Perfil | Devter",
    description: "Configuración y datos del perfil de usuario.",
    robots: {
        index: false,
        follow: false,
    },
});

export default async function ProfilePage() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/login");
    }

    return <ProfileClient userName={session.user.name || "there!"} />;
}
