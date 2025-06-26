import { getServerSession } from "next-auth";
import { handler } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function Home() {
    const session = await getServerSession(handler);

    if (session) {
        redirect("/dashboard");
    } else {
        redirect("/login");
    }
}
