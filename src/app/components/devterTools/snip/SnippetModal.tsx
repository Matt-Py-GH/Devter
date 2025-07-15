'use client';

import { useState } from "react";

type SnippetModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: { title: string; description: string; code: string }) => void;
};

export default function SnippetModal({ isOpen, onClose, onSubmit }: SnippetModalProps) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [code, setCode] = useState("");

    const handleSubmit = () => {
        if (!title || !code) return;
        onSubmit({ title, description, code });
        setTitle("");
        setDescription("");
        setCode("");
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 px-4">
            <div className="bg-neutral-900 text-white w-full max-w-xl rounded-2xl p-6 shadow-lg border border-neutral-700 relative">
                <h2 className="text-xl font-semibold mb-4 font-mono">Nuevo Snip</h2>

                <input
                    type="text"
                    placeholder="Título"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full mb-3 px-4 py-2 rounded bg-neutral-800 border border-neutral-600 text-sm"
                />

                <input
                    type="text"
                    placeholder="Tecnología o descripción"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full mb-3 px-4 py-2 rounded bg-neutral-800 border border-neutral-600 text-sm"
                />

                <textarea
                    placeholder="Código"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="w-full h-40 px-4 py-2 rounded bg-neutral-800 border border-neutral-600 text-sm font-mono resize-y"
                />

                <div className="flex justify-end gap-2 mt-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-1 text-sm bg-neutral-700 hover:bg-neutral-600 rounded"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="px-4 py-1 text-sm bg-white text-black rounded hover:bg-violet-200"
                    >
                        Guardar
                    </button>
                </div>
            </div>
        </div>
    );
}
