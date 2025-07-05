"use client";

import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp, Plus, Trash2, Edit3 } from "lucide-react";
import axios from "axios";

type BacklogItem = {
    _id: string;
    title: string;
    description?: string;
    status: "todo" | "doing" | "done";
};

export default function MiniBacklog() {
    const [open, setOpen] = useState(true);
    const [items, setItems] = useState<BacklogItem[]>([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Cargar backlog al montar
    useEffect(() => {
        async function fetchBacklog() {
            setLoading(true);
            setError(null);
            try {
                const res = await fetch("/api/backlog");
                if (!res.ok) throw new Error("Error al cargar backlog");
                const data = await res.json();
                setItems(data);
            } catch (e: any) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
        }

        fetchBacklog();
    }, []);

    const addItem = async () => {
        if (!title.trim()) return;
        setLoading(true);
        setError(null);
        try {
            const res = await axios.post("/api/backlog", { title, description });
            const newItem = res.data;
            setItems([newItem, ...items]);
            setTitle("");
            setDescription("");
        } catch (e: any) {
            setError(e.response?.data?.message || e.message);
        } finally {
            setLoading(false);
        }
    };


    const deleteItem = async (itemId: string) => {
        console.log("Deleting item with ID:", itemId);
        setLoading(true);
        setError(null);
        try {
            const res = await axios.delete("/api/backlog", { data: { id: itemId } });
            console.log("Delete response:", res.data);
            setItems(items.filter(item => item._id !== itemId));
        } catch (e: any) {
            setError(e.message);
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <div className="bg-neutral-900 text-white rounded-2xl shadow-md w-full max-w-xl mx-auto mb-4 max-h-[80vh] flex flex-col mt-4">
            <div
                onClick={() => setOpen(!open)}
                className="flex justify-between items-center px-4 py-3 cursor-pointer select-none border-neutral-700"
            >
                <span className="text-lg font-mono">📋 Backlog</span>
                {open ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </div>

            {open && (
                <div className="flex flex-col flex-grow p-4 space-y-4 overflow-hidden">
                    {/* Formulario */}
                    <div className="shrink-0 border-b border-neutral-700 pb-4">
                        <p className="text-sm mb-2">➕ Nueva tarea</p>
                        <input
                            type="text"
                            placeholder="Título"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full mb-2 bg-neutral-800 border border-neutral-600 rounded px-3 py-1 text-sm"
                            disabled={loading}
                        />
                        <textarea
                            placeholder="Descripción (opcional)"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full mb-2 bg-neutral-800 border border-neutral-600 rounded px-3 py-1 text-sm resize-none"
                            disabled={loading}
                        />
                        <button
                            onClick={addItem}
                            className="flex items-center gap-1 bg-blue-600 hover:bg-blue-500 text-white text-sm px-3 py-1 rounded transition disabled:opacity-50"
                            disabled={loading}
                        >
                            <Plus size={14} /> Agregar
                        </button>
                    </div>

                    {/* Lista scrollable */}
                    {loading && <p className="text-center text-sm text-neutral-400">Cargando...</p>}
                    {error && <p className="text-center text-sm text-red-500">{error}</p>}
                    <ul className="flex-grow overflow-y-auto pr-1 space-y-2">
                        {items.map((item) => (
                            <li
                                key={item._id}
                                className="bg-neutral-800 p-3 rounded-xl border border-neutral-700 flex flex-col hover:bg-neutral-700 transition"
                            >
                                <div className="flex justify-between items-center">
                                    <span className="font-semibold">{item.title}</span>
                                    <span
                                        className={`text-xs px-2 py-0.5 rounded-full font-mono ${item.status === "todo"
                                            ? "bg-yellow-400 text-black"
                                            : item.status === "doing"
                                                ? "bg-blue-400 text-white"
                                                : "bg-green-400 text-black"
                                            }`}
                                    >
                                        {item.status}
                                    </span>
                                </div>
                                {item.description && (
                                    <p className="text-sm text-neutral-300 mt-1">{item.description}</p>
                                )}
                                <div className="flex gap-2 mt-2 self-end">
                                    <button className="hover:text-yellow-400 cursor-pointer" disabled><Edit3 size={16} /></button>
                                    <button onClick={() => deleteItem(item._id)} className="hover:text-red-500 cursor-pointer"><Trash2 size={16} /></button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
