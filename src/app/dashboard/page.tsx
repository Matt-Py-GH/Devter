//Client component
"use client";

//React & Next imports
import { useSession } from "next-auth/react";

//Components
import Header from "../components/header/Header";
import Backlog from "../components/devlterTools/backlog/Backlog";
import PaintWindow from "../components/devlterTools/pizarra/Pizarra";

export default function Dashboard() {
    const { data: session } = useSession();
    const user = session?.user;
    const userName = user?.name || "there!";

    return (
        <>
            <Header children={`Hello, ${userName}`} />
            <Backlog />
            <PaintWindow />

        </>
    )
}