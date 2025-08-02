'use client';

import axios from "axios";
import { useState, useEffect, useCallback } from "react";

import { Save, Check } from "lucide-react";

export default function Book() {
    const [notes, setNotes] = useState("")
    const [saved, setSaved] = useState(false);

    const fetchNotes = useCallback(async () => {
        const res = await axios.get("/api/notes");
        const notes = res.data.content;
        setNotes(notes);
    }, []);

    const handleSave = useCallback(async () => {
        try {
            setSaved(true)
            setTimeout(() => setSaved(false), 2000)
            await axios.post("/api/notes", { content: notes })
            await fetchNotes()
        }
        catch (err) {
            console.log(err);
        }
    }, [notes, fetchNotes])

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") {
                e.preventDefault();
                handleSave();
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [handleSave]);


    // Mover ventana
    useEffect(() => {
        fetchNotes();

    }, [fetchNotes]);


    return (
        <div className="bg-gradient-to-br from-neutral-900 to-black rounded-xl shadow-xl border border-neutral-700 flex flex-col h-full max-h-[600px] flex-grow">
            {/* Botones de acción */}
            <div className="flex justify-end gap-2 p-2">
                <button
                    className="text-white hover:text-green-400 transition-colors px-2 py-1 rounded text-sm font-mono"
                    title="Guardar"
                    onClick={handleSave}>
                    {saved ? <Check size={16} /> : <Save size={16} />}
                </button>
            </div>

            {/* Área de texto */}
            <textarea
                value={notes || ""}
                onChange={(e) => setNotes(e.target.value)}
                className="flex-grow w-full bg-neutral-800 text-white p-4 font-mono text-sm rounded-t-none rounded-b-xl resize-none outline-none border-t border-neutral-700"
            />
        </div>

    );
}
