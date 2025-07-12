"use client";

//React & Next imports
import { useSession } from "next-auth/react";

//Components
import Header from "../components/header/Header";
import Backlog from "../components/devterTools/backlog/Backlog";
import PaintWindow from "../components/devterTools/pizarra/Pizarra";
import ErrorLog from "../components/devterTools/errorlog/ErrorLog";
import CMD from "../components/devterTools/consola/CMD"
import Book from "../components/devterTools/book/Book";

export default function Dashboard() {
    const { data: session } = useSession();
    const user = session?.user;
    const userName = user?.name || "there!";

    return (
        <>
            <Header>{`Hello, ${userName}`}</Header>
            <Backlog />
            <PaintWindow />
            <ErrorLog />
            <CMD />
            <Book />

        </>
    )
}