"use client";

//React & lucide
import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Edit3, Trash2 } from "lucide-react";

import SnippetModal from "./SnippetModal";

//Axios for more pleasure
import axios from "axios";

type Snippet = {
    _id: string
    title: string
    description: string
    code: string
}

export default function Snip() {
    const [open, setOpen] = useState(false);
    const [snippets, setSnippets] = useState<Snippet[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null | string>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [openAdder, setOpenAdder] = useState(false)

    useEffect(() => {
        async function fetchSnippets() {
            setLoading(true);
            setError(null);
            try {
                const res = await fetch("/api/snippet");
                if (!res.ok) throw new Error("Error al cargar snippets");
                const data = await res.json();
                setSnippets(data);
            } catch (e: unknown) {
                if (e instanceof Error) {
                    setError(e)

                } else { setError("unknwon error") }
            } finally {
                setLoading(false);
            }
        }

        fetchSnippets();
    }, []);

    const addSnippet = async (snippet: { title: string; description: string; code: string }) => {
        setLoading(true);
        setError(null);
        try {
            const res = await axios.post("/api/snippet", snippet);
            const newSnippet = res.data;

            setSnippets((prev) => [...prev, newSnippet]);
            setOpenAdder(false);
        } catch (error: unknown) {
            if (error instanceof Error) setError(error.message);
            else setError("Error desconocido");
        } finally {
            setLoading(false);
        }
    };


    const updateSnippet = async (updatedSnippet: Snippet) => {
        setLoading(true);
        setError(null);
        try {
            const res = await axios.patch("/api/snippet", updatedSnippet)
            const newSnippet = res.data;

            setSnippets(prev =>
                prev.map(Snippet => (Snippet._id === newSnippet._id ? newSnippet : Snippet))
            );

        } catch (error: unknown) {
            if (error instanceof Error) {
                setError(error.message);
            } else { setError("UnkwonError") }
        }
        finally {
            setLoading(false)
        }
    }

    const deleteSnippet = async (SnippetId: string) => {
        console.log("Deleting Snippet with ID:", SnippetId);
        setLoading(true);
        setError(null);
        try {
            const res = await axios.delete("/api/snippet", { data: { id: SnippetId } });
            console.log("Delete response:", res.data);
            setSnippets(snippets.filter(Snippet => Snippet._id !== SnippetId));
        } catch (e: unknown) {
            if (e instanceof Error)
                setError(e);
            else {
                setError("unknown error")
            }
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <div className="bg-neutral-900 text-white rounded-2xl shadow-md w-full max-w-xl mx-auto max-h-[80vh] flex flex-col mt-4 transition-all">
            <div
                onClick={() => setOpen(!open)}
                className="flex justify-between Snippets-center px-4 py-3 cursor-pointer select-none border-neutral-700">

                <span className="text-lg font-mono">Snip</span>
                {open ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </div>

            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out 
    ${open ? "max-h-[80vh] opacity-100 p-4" : "max-h-0 opacity-0 p-0"} flex flex-col flex-grow space-y-4`}
            >

                {/* Botón + / Cancelar para mostrar el SnippetAdder */}
                <div className="flex justify-end">
                    <button
                        onClick={() => setOpenAdder(!openAdder)}
                        className="bg-neutral-700 hover:bg-neutral-600 text-white px-2 py-1 rounded text-sm transition"
                    >
                        {openAdder ? "x" : "+"}
                    </button>
                </div>

                {/* Mensajes de estado */}
                {loading && <p className="text-center text-sm text-neutral-400">Cargando...</p>}
                {error && <p className="text-center text-sm text-red-500">{typeof error === "string" ? error : error.message}</p>}

                {/* Búsqueda y filtro */}
                <div className="flex flex-col sm:flex-row sm:Snippets-center gap-2 border-b border-neutral-700 pb-4">
                    <input
                        type="text"
                        placeholder="🔍 Buscar por título"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full sm:w-auto flex-grow bg-neutral-800 border border-neutral-600 rounded px-3 py-1 text-sm"
                    />
                </div>

                {/* SnippetAdder */}
                {openAdder && (
                    <div className="bg-neutral-800 p-3 rounded-lg border border-neutral-700">
                        <SnippetModal
                            isOpen={openAdder}
                            onClose={() => setOpenAdder(false)}
                            onSubmit={addSnippet}
                        />
                    </div>
                )}

                {/* Lista de ítems */}
                <ul className="flex-grow overflow-y-auto pr-1 space-y-2">
                    {snippets
                        .filter((s) => s.title.toLowerCase().includes(searchTerm.toLowerCase()))
                        .map((snippet) => (
                            <li
                                key={snippet._id}
                                className="bg-neutral-800 p-3 rounded-xl border border-neutral-700 flex flex-col hover:bg-neutral-700 transition"
                            >
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-semibold text-sm mb-1">{snippet.title}</h3>
                                        <pre className="text-xs font-mono whitespace-pre-wrap break-words max-h-40 overflow-y-auto bg-neutral-900 p-2 rounded border border-neutral-700">
                                            {snippet.code}
                                        </pre>
                                    </div>
                                    <div className="flex gap-2 mt-2 self-end">
                                        <button
                                            onClick={() => console.log("Abrir modal de edición")}
                                            className="hover:text-yellow-400"
                                        >
                                            <Edit3 size={16} />
                                        </button>
                                        <button
                                            onClick={() => deleteSnippet(snippet._id)}
                                            className="hover:text-red-500"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))}
                </ul>

            </div>
        </div>
    );
}
