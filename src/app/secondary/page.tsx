// src/app/secondary-dashboard/page.tsx
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/authOptions";
import { redirect } from "next/navigation";
import SecondaryDashboard from "../clientPages/Secondary";

export const generateMetadata = (): Metadata => ({
    title: "Devter",
    description: "Dashboard secundario de Devter.",
    robots: {
        index: false,
        follow: false,
    },
});

export default async function Secondary() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/login");
    }

    return <SecondaryDashboard />;
}
