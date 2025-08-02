"use client";

import { useEffect, useState } from "react";
import { Trash2, Copy, CopyCheck, Plus, X } from "lucide-react";

import axios from "axios";

type Command = {
    _id: string
    command: string
}

export default function Console() {
    const [showAdder, setShowAdder] = useState(false);
    const [command, setCommand] = useState("");
    const [commands, setCommands] = useState<Command[]>([]);
    const [copiedId, setCopiedId] = useState<number | null>(null);


    useEffect(() => {
        fetchCommands()
    }, [])

    async function fetchCommands() {
        try {
            const res = await axios.get("/api/command")
            const data = res.data
            setCommands(data)
            console.log(data)
        } catch (err: unknown) {
            console.log(err)
        }
    }

    const addCommand = async (commandText: string) => {
        try {
            await axios.post("/api/command", { command: commandText })
        } catch (error: unknown) {
            console.log(error)
        } finally {
            setTimeout(() => {
                console.clear()
            }, 4000)
        }
    }

    const handleDeleteCommand = async (commandID: string) => {
        try {
            await axios.delete("/api/command", { data: { id: commandID } })
            fetchCommands()
        }
        catch (error: unknown) {
            console.log(error);
        }
    }

    return (
        <>
            {/* Consola deslizable */}
            <div
                className={`bg-black text-white border-t border-neutral-700 transition-transform duration-300 ease-in-out font-mono rounded-2xl shadow-xl h-130`}>

                {/* Botón + / x en la esquina superior derecha */}
                <div className="cursor-pointer absolute top-5 right-5 z-10">
                    <button
                        onClick={() => setShowAdder(!showAdder)}
                        className="hover:bg-neutral-600 text-white p-1 rounded-2xl transition cursor-pointer">
                        {showAdder ? <X size={16} /> : <Plus size={16} />}
                    </button>
                </div>


                {/* Área de comandos */}
                <div className="flex flex-col p-4 text-sm overflow-y-auto pb-20 scrollbar-thin scrollbar-thumb-neutral-600 h-140">
                    <p className="text-white">{">_"}</p>
                    {/* Comandos agregados se mostrarán acá en el futuro */}
                    <ul className="flex-grow overflow-y-auto pr-1 space-y-2">
                        {commands.map((cmd, id) => (
                            <li key={id} className="bg-black-100 px-2 py-0.5 rounded text-white">
                                <span className="truncate">
                                    {cmd.command}
                                </span>
                                <div className="flex gap-2 ml-4">
                                    <button
                                        className="hover:text-blue-400 transition"
                                        title="Copiar"
                                        onClick={() => {
                                            navigator.clipboard.writeText(cmd.command);
                                            setCopiedId(id);
                                            setTimeout(() => {
                                                setCopiedId(null);
                                            }, 4000);
                                        }}>
                                        {copiedId === id ? <CopyCheck size={16} /> : <Copy size={16} />}
                                    </button>

                                    <button
                                        className="hover:text-red-400 transition"
                                        title="Eliminar"
                                        onClick={() => {
                                            handleDeleteCommand(cmd._id)
                                        }}>
                                        <Trash2 size={17} />
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Campo de agregar comando */}
                {showAdder && (
                    <div className="absolute bottom-0 left-0 w-full p-4 bg-neutral-800 border-t border-neutral-700 flex gap-2 items-center">
                        <input
                            type="text"
                            value={command}
                            onChange={(e) => setCommand(e.target.value)}
                            placeholder="Escribe un comando..."
                            className="flex-grow px-3 py-1 rounded bg-neutral-900 border border-neutral-600 text-sm text-white" />
                        <button
                            onClick={() => {
                                // Luego: agregar a lista
                                addCommand(command)
                                setCommand("");
                                fetchCommands()
                            }}
                            className="px-3 py-1 text-sm bg-blue-600 hover:bg-blue-500 rounded text-white">
                            Agregar
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}
