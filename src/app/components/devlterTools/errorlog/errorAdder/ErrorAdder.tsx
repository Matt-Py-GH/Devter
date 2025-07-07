import { Plus } from "lucide-react";
import { useState, useEffect } from "react";


import axios from "axios";

type ErrorItem = {
    _id: string;
    title: string;
    description?: string;
    status: "bug" | "fixing" | "fixed";
};

export default function ErrorAdder({ onErrorAdded }: { onErrorAdded: (item: ErrorItem) => void }) {

    const [bugs, setBugs] = useState<ErrorItem[]>([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchBacklog() {
            setLoading(true);
            setError(null);
            try {
                const res = await fetch("/api/bugs");
                if (!res.ok) throw new Error("Error al cargar Error list");
                const data = await res.json();
                setBugs(data);
            } catch (e: any) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
        }

        fetchBacklog();
    }, []);

    const addBug = async () => {
        if (!title.trim()) return;
        setLoading(true);
        setError(null);
        try {
            const res = await axios.post("/api/bugs", { title, description });
            const newBug = res.data;
            onErrorAdded(newBug);
            setBugs([newBug, ...bugs]);
            setTitle("");
            setDescription("");
        } catch (e: any) {
            setError(e.response?.data?.message || e.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed z-50 bg-neutral-900 border border-neutral-700 rounded-br-xl p-4 shadow-md w-90 max-w-sm text-sm font-mono left-0 top-126">
            <input
                type="text"
                placeholder="Título"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full mb-2 bg-neutral-800 border border-neutral-600 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 transition disabled:opacity-50"
                disabled={loading}
            />
            <textarea
                placeholder="Descripción (opcional)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full mb-2 bg-neutral-800 border border-neutral-600 rounded-md px-3 py-1 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition disabled:opacity-50"
                rows={3}
                disabled={loading}
            />
            <button
                onClick={addBug}
                className="flex items-center gap-1 bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded-md transition disabled:opacity-50 cursor-pointer"
                disabled={loading}
            >
                <Plus size={14} /> Add
            </button>
        </div>
    )


}