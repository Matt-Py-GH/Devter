import { Plus } from "lucide-react";
import { useState, useEffect } from "react";


import axios from "axios";

type BacklogItem = {
    _id: string;
    title: string;
    description?: string;
    status: "todo" | "doing" | "done";
};

export default function ItemAdder({ onItemAdded }: { onItemAdded: (item: BacklogItem) => void }) {

    const [items, setItems] = useState<BacklogItem[]>([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

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
            onItemAdded(newItem);
            setItems([newItem, ...items]);
            setTitle("");
            setDescription("");
        } catch (e: any) {
            setError(e.response?.data?.message || e.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
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
                    className="flex items-center gap-1 bg-blue-600 hover:bg-blue-500 text-white text-sm px-3 py-1 rounded transition disabled:opacity-50 cursor-pointer"
                    disabled={loading}
                >
                    <Plus size={14} /> Agregar
                </button>
            </div>
        </>
    )

}