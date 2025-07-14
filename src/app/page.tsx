import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/authOptions";
import { redirect } from "next/navigation";

export const generateMetadata = (): Metadata => ({
    title: "Devter",
    description: "Organiza tus proyectos, código y notas con Devter.",
    robots: {
        index: false,
        follow: false,
    },
    alternates: {
        canonical: "https://devter.dev",
    },
});


export default async function Home() {
    const session = await getServerSession(authOptions);

    if (session) {
        redirect("/dashboard");
    } else {
        redirect("/login");
    }
}
