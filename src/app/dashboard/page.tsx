// src/app/dashboard/page.tsx  (server component)

import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/authOptions";
import { redirect } from "next/navigation";
import DashboardClient from "../clientPages/Dashboard";

export const generateMetadata = (): Metadata => ({
    title: "Devter",
    description: "Tu espacio personal de desarrollo en Devter.",
    robots: {
        index: false,
        follow: false,
    },
})

export default async function DashboardPage() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/login");
    }

    return <DashboardClient />;
}
