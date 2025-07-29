// src/app/dashboard/DashboardClient.tsx

"use client";

import Header from "../components/header/Header";
import Backlog from "../components/devterTools/backlog/Backlog";
import PaintWindow from "../components/devterTools/pizarra/Pizarra";
import ErrorLog from "../components/devterTools/errorlog/ErrorLog";
import CMD from "../components/devterTools/consola/CMD";
import Book from "../components/devterTools/book/Book";
import Snippet from "../components/devterTools/snippet/Snippet";

interface Props {
    userName: string;
}

export default function DashboardClient({ userName }: Props) {
    return (
        <>
            <Header>{`${userName}`}</Header>
            <main className="flex flex-col w-full h-screen px-4 py-2 gap-4">
                {/* Fila principal */}
                <div className="flex flex-row justify-between items-start w-full gap-4">
                    {/* Izquierda: ErrorLog */}
                    <div className="flex-none">
                        <ErrorLog />
                    </div>

                    {/* Centro-izquierda: PaintWindow + Book */}
                    <div className="flex flex-row items-start gap-2 flex-none">
                        <PaintWindow />
                        <Book />
                    </div>

                    {/* Centro: Backlog */}
                    <div className="flex-grow flex justify-center">
                        <Backlog />
                    </div>

                    {/* Derecha: Snippet */}
                    <div className="flex-none">
                        <Snippet />
                    </div>
                </div>

                {/* Consola abajo centrada */}
                <div className="flex justify-center mt-auto">
                    <CMD />
                </div>
            </main>
        </>
    );


}
