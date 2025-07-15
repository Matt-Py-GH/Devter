// src/app/dashboard/DashboardClient.tsx

"use client";

import Header from "../components/header/Header";
import Backlog from "../components/devterTools/backlog/Backlog";
import PaintWindow from "../components/devterTools/pizarra/Pizarra";
import ErrorLog from "../components/devterTools/errorlog/ErrorLog";
import CMD from "../components/devterTools/consola/CMD";
import Book from "../components/devterTools/book/Book";
import Snippet from "../components/devterTools/snip/Snippet";

interface Props {
    userName: string;
}

export default function DashboardClient({ userName }: Props) {
    return (
        <>
            <Header>{`${userName}`}</Header>
            <Backlog />
            <PaintWindow />
            <ErrorLog />
            <CMD />
            <Book />
            <Snippet />
        </>
    );
}
