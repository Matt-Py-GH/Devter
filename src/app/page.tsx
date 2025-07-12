import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/authOptions";
import { redirect } from "next/navigation";

export default async function Home() {
    const session = await getServerSession(authOptions);

    if (session) {
        redirect("/dashboard");
    } else {
        redirect("/login");
    }
}
