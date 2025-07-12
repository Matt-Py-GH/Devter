"use client";

//Components
import ItemCard from "../cardComponent/CardComponent"
import Adder from "../adderComponent/Adder";

import { Item } from "../adderComponent/Adder";

//React & lucide
import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

//Axios for more pleasure
import axios from "axios";


export default function Backlog() {
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState<Item[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null | string>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [openAdder, setOpenAdder] = useState(false)

    useEffect(() => {
        const storedFilter = localStorage.getItem("backlogStatusFilter");
        setStatusFilter(storedFilter || "")
        async function fetchBacklog() {
            setLoading(true);
            setError(null);
            try {
                const res = await fetch("/api/backlog");
                if (!res.ok) throw new Error("Error al cargar backlog");
                const data = await res.json();
                setItems(data);
            } catch (e: unknown) {
                if (e instanceof Error) {
                    setError(e)

                } else { setError("unknwon error") }
            } finally {
                setLoading(false);
            }
        }

        fetchBacklog();
    }, []);

    const updateItem = async (updatedItem: Item) => {
        setLoading(true);
        setError(null);
        try {
            const res = await axios.patch("/api/backlog", updatedItem)
            const newItem = res.data;

            setItems(prev =>
                prev.map(item => (item._id === newItem._id ? newItem : item))
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

    const deleteItem = async (itemId: string) => {
        console.log("Deleting item with ID:", itemId);
        setLoading(true);
        setError(null);
        try {
            const res = await axios.delete("/api/backlog", { data: { id: itemId } });
            console.log("Delete response:", res.data);
            setItems(items.filter(item => item._id !== itemId));
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

    const filteredItems = items.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (statusFilter ? item.status === statusFilter : true)
    );

    return (
        <div className="bg-neutral-900 text-white rounded-2xl shadow-md w-full max-w-xl mx-auto max-h-[80vh] flex flex-col mt-4 transition-all">
            <div
                onClick={() => setOpen(!open)}
                className="flex justify-between items-center px-4 py-3 cursor-pointer select-none border-neutral-700">

                <span className="text-lg font-mono">Backlog</span>
                {open ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </div>

            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out 
    ${open ? "max-h-[80vh] opacity-100 p-4" : "max-h-0 opacity-0 p-0"} flex flex-col flex-grow space-y-4`}
            >

                {/* Botón + / Cancelar para mostrar el ItemAdder */}
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
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 border-b border-neutral-700 pb-4">
                    <input
                        type="text"
                        placeholder="🔍 Buscar por título"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full sm:w-auto flex-grow bg-neutral-800 border border-neutral-600 rounded px-3 py-1 text-sm"
                    />
                    <select
                        value={statusFilter}
                        onChange={(e) => {
                            setStatusFilter(e.target.value);
                            localStorage.setItem("backlogStatusFilter", e.target.value);
                        }}
                        className="w-full sm:w-auto bg-neutral-800 border border-neutral-600 rounded px-3 py-1 text-sm text-white"
                    >
                        <option value="">Todos</option>
                        <option value="todo">🟡 Todo</option>
                        <option value="doing">🔵 Doing</option>
                        <option value="done">🟢 Done</option>
                    </select>
                </div>

                {/* ItemAdder */}
                {openAdder && (
                    <div className="bg-neutral-800 p-3 rounded-lg border border-neutral-700">
                        <Adder
                            location="backlog"
                            api="/api/backlog"
                            onItemAdded={(newItem) => setItems(prev => [newItem as Item, ...prev])}
                        />
                    </div>
                )}

                {/* Lista de ítems */}
                <ul className="flex-grow overflow-y-auto pr-1 space-y-2">
                    {filteredItems.map(item => (
                        <ItemCard
                            key={item._id}
                            item={item}
                            onDelete={deleteItem}
                            onUpdate={(updatedItem) => {
                                if ('status' in updatedItem && ['todo', 'doing', 'done'].includes(updatedItem.status)) {
                                    updateItem(updatedItem as Item);
                                }
                            }}
                        />
                    ))}
                </ul>
            </div>
        </div>
    );
}
