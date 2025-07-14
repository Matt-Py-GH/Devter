'use client';

import axios from "axios";
import { useState, useEffect, useCallback } from "react";

import { Save, Check, Notebook } from "lucide-react";

export default function Book() {
    const [isMinimized, setIsMinimized] = useState(true);
    const [isDragging, setIsDragging] = useState(false);
    const [notes, setNotes] = useState("")
    const [pos, setPos] = useState({ x: 280, y: 80 });
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

        const handleMouseMove = (e: MouseEvent) => {
            if (isDragging) {
                setPos((prev) => ({
                    x: prev.x + e.movementX,
                    y: prev.y + e.movementY,
                }));
            }
        };
        const stopDragging = () => setIsDragging(false);

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", stopDragging);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", stopDragging);
        };
    }, [isDragging, fetchNotes]);


    return (
        <div
            style={{ left: pos.x, top: pos.y }}
            className="fixed z-50"
        >
            {isMinimized ? (
                <div className="relative group">
                    <div
                        onContextMenu={e => e.preventDefault()}
                        onClick={() => setIsMinimized(false)}
                        className="bg-neutral-800 text-white text-xs px-3 py-1 rounded-full cursor-pointer shadow-lg border border-white hover:bg-neutral-700 transition">
                        <Notebook size={16} />
                    </div>
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition pointer-events-none whitespace-nowrap shadow">
                        Open book
                    </span>
                </div>
            ) : (
                <div className="mt-10 w-196 h-120 bg-gradient-to-br from-neutral-900 to-black rounded-xl shadow-xl flex flex-col overflow-hidden border border-neutral-700"
                    onContextMenu={e => e.preventDefault()}
                    onMouseDown={e => {
                        if (e.button === 0) setIsDragging(true);
                    }}>
                    {/* Botones de acción */}
                    <div className="flex justify-end gap-2 p-2">
                        <button
                            className="text-white hover:text-green-400 transition-colors px-2 py-1 rounded text-sm font-mono"
                            title="Guardar"
                            onClick={handleSave}>
                            {saved ? <Check size={16} /> : <Save size={16} />}
                        </button>
                        <button
                            className="text-white hover:text-red-400 transition-colors px-2 py-1 rounded text-sm font-mono"
                            title="Cerrar"
                            onClick={() => {
                                setPos({ x: 280, y: 80 })
                                setIsMinimized(true)
                            }}>
                            X
                        </button>
                    </div>

                    {/* Área de texto */}
                    <textarea
                        value={notes || ""}
                        onChange={e => setNotes(e.target.value)}
                        className="flex-grow w-full bg-neutral-800 text-white p-4 font-mono text-sm rounded-t-none rounded-b-xl resize-none outline-none border-t border-neutral-700"
                    />
                </div>


            )}
        </div>
    );
}
