// src/app/dashboard/DashboardClient.tsx

"use client";

//Componentes
import Header from "../components/header/Header";
import Backlog from "../components/devterTools/backlog/Backlog";
import Paint from "../components/devterTools/pizarra/Pizarra";
import ErrorLog from "../components/devterTools/errorlog/ErrorLog";
import CMD from "../components/devterTools/consola/CMD";
import Book from "../components/devterTools/book/Book";
import Snippet from "../components/devterTools/snippet/Snippet";

//React imports
import { useState } from "react";

//Lucide imports
import { Notebook, TableOfContents, Terminal, Paintbrush, LucideBug, FileCode2 } from "lucide-react";

export default function DashboardClient() {

    const toolStyle = "fixed top-16 left-0 w-full h-[calc(100vh-120px)] p-4 z-40";
    const buttonStyle = "cursor-pointer w-8 h-8 transition-transform duration-200 ease-in-out hover:-translate-y-1";
    const iconSize = 32


    const [tools, setTools] = useState({
        errorLog: false,
        backlog: false,
        terminal: false,
        snip: false,
        notebook: false,
        paint: false
    })

    return (
        <>
            <Header />
            <main className="relative flex flex-col">
                <section className="">
                    {tools.backlog && <div className={toolStyle}><Backlog /></div>}
                    {tools.errorLog && <div className={toolStyle}><ErrorLog /></div>}
                    {tools.paint && <div className={toolStyle}><Paint /></div>}
                    {tools.snip && <div className={toolStyle}><Snippet /></div>}
                    {tools.notebook && <div className={toolStyle}><Book /></div>}
                    {tools.terminal && <div className={toolStyle}><CMD /></div>}
                </section>

                {/* Botonera inferior */}
                <section className="fixed bottom-4 left-1/2 -translate-x-1/2 flex gap-10 items-center bg-neutral-900 p-3 rounded-xl shadow-lg z-50 max-sm:gap-2">
                    <button className={buttonStyle} onClick={() => setTools({
                        errorLog: false, backlog: false,
                        terminal: false, snip: false,
                        notebook: true, paint: false
                    })}>
                        <Notebook size={iconSize} />
                    </button>
                    <button className={buttonStyle} onClick={() => setTools({
                        errorLog: false, backlog: true,
                        terminal: false, snip: false,
                        notebook: false, paint: false
                    })}>
                        <TableOfContents size={iconSize} />
                    </button>
                    <button className={buttonStyle} onClick={() => setTools({
                        errorLog: false, backlog: false,
                        terminal: true, snip: false,
                        notebook: false, paint: false
                    })}>
                        <Terminal size={iconSize} />
                    </button>
                    <button className={buttonStyle} onClick={() => setTools({
                        errorLog: false, backlog: false,
                        terminal: false, snip: false,
                        notebook: false, paint: true
                    })}>
                        <Paintbrush size={iconSize} />
                    </button>
                    <button className={buttonStyle} onClick={() => setTools({
                        errorLog: true, backlog: false,
                        terminal: false, snip: false,
                        notebook: false, paint: false
                    })}>
                        <LucideBug size={iconSize} />
                    </button>
                    <button className={buttonStyle} onClick={() => setTools({
                        errorLog: false, backlog: false,
                        terminal: false, snip: true,
                        notebook: false, paint: false
                    })}>
                        <FileCode2 size={iconSize} />
                    </button>
                </section>

            </main>
        </>
    );
}
