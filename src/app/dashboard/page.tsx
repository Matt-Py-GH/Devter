//Client component
"use client";

//React & Next imports
import { useSession } from "next-auth/react";

//Components
import Header from "../components/header/Header";

export default function Dashboard() {
    const { data: session } = useSession();
    const user = session?.user;
    const userName = user?.name || "there!";

    return (
        <>
            <Header children={`Hello, ${userName}`} />
        </>
    )
}