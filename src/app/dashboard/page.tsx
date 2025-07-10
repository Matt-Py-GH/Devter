//Client component
"use client";

//React & Next imports
import { useSession } from "next-auth/react";

//Components
import Header from "../components/header/Header";
import Backlog from "../components/devlterTools/backlog/Backlog";
import PaintWindow from "../components/devlterTools/pizarra/Pizarra";
import ErrorLog from "../components/devlterTools/errorlog/ErrorLog";
import CMD from "../components/devlterTools/consola/CMD"
import Book from "../components/devlterTools/book/book";

export default function Dashboard() {
    const { data: session } = useSession();
    const user = session?.user;
    const userName = user?.name || "there!";

    return (
        <>
            <Header children={`Hello, ${userName}`} />
            <Backlog />
            <PaintWindow />
            <ErrorLog />
            <CMD />
            <Book />
        </>
    )
}