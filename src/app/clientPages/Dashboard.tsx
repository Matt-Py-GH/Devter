// src/app/dashboard/DashboardClient.tsx

"use client";

import Header from "../components/header/Header";
import Backlog from "../components/devterTools/backlog/Backlog";
import Paint from "../components/devterTools/pizarra/Pizarra";
import ErrorLog from "../components/devterTools/errorlog/ErrorLog";
import CMD from "../components/devterTools/consola/CMD";
import Book from "../components/devterTools/book/Book";
import Snippet from "../components/devterTools/snippet/Snippet";
import { useState } from "react";

//Lucide imports
import { Notebook, LogsIcon, Terminal } from "lucide-react";

export default function DashboardClient() {

    const toolStyle = "m-4"
    const buttonStyle =
        "cursor-pointer w-8 h-8 transition-transform duration-200 ease-in-out hover:-translate-y-1";
    const iconSize = 32

    const [errorLog, setErrorLog] = useState(false)
    const [backlog, setBacklog] = useState(false)
    const [paint, setPaint] = useState(false)
    const [notebook, setNotebook] = useState(false)
    const [snip, setSnip] = useState(false)
    const [terminal, setTerminal] = useState(false)

    return (
        <>
            <Header />
            <main className="flex flex-col">
                <section className="">
                    <div className={toolStyle}>
                        {!backlog && <Backlog />}
                    </div>

                    <div className={toolStyle}>
                        {errorLog && <ErrorLog />}
                    </div>

                    <div className={toolStyle}>
                        {paint && <Paint />}
                    </div>

                    <div className={toolStyle}>
                        {snip && <Snippet />}
                    </div>

                    <div className={toolStyle}>
                        {notebook && <Book />}
                    </div>

                    <div className={toolStyle}>
                        {terminal && <CMD />}
                    </div>
                </section>

                <section className="flex gap-20 ml-100 bottom-3 items-center">
                    <button className={buttonStyle}
                        onClick={() => setNotebook(!notebook)}>
                        <Notebook size={iconSize} />
                    </button>

                    <button className={buttonStyle}
                        onClick={() => setBacklog(!backlog)}>
                        <LogsIcon size={iconSize} />
                    </button>

                    <button className={buttonStyle}
                        onClick={() => setTerminal(!terminal)}>
                        <Terminal size={iconSize} />
                    </button>

                    <button className={buttonStyle}></button>
                    <button className={buttonStyle}></button>
                    <button className={buttonStyle}></button>
                </section>
            </main>
        </>
    );


}
