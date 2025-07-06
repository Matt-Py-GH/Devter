"use client";

import { useState } from "react";
import { Edit3, Trash2, Check, X } from "lucide-react";

type ErrorItem = {
    _id: string;
    title: string;
    description?: string;
    status: "bug" | "fixing" | "fixed";
};

type Props = {
    bug: ErrorItem;
    onDelete: (id: string) => void;
    onUpdate: (updatedItem: ErrorItem) => void;
};

export default function BugCard({ bug, onDelete, onUpdate }: Props) {
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(bug.title);
    const [editDescription, setEditDescription] = useState(bug.description || "");
    const [editStatus, setEditStatus] = useState(bug.status);

    const handleSave = () => {
        onUpdate({
            _id: bug._id,
            title: editTitle,
            description: editDescription,
            status: editStatus,
        });
        setIsEditing(false);
    };

    if (isEditing) {
        return (
            <li className="bg-neutral-800 p-3 rounded-xl border border-neutral-700 flex flex-col space-y-2">
                <input
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="bg-neutral-700 rounded px-2 py-1 text-sm text-white"
                />
                <textarea
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    className="bg-neutral-700 rounded px-2 py-1 text-sm text-white resize-none"
                />
                <select
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value as ErrorItem["status"])}
                    className="bg-neutral-700 rounded px-2 py-1 text-sm text-white"
                >
                    <option value="bug">Bug</option>
                    <option value="fixing">Fixing</option>
                    <option value="fixed">Fixed</option>
                </select>
                <div className="flex justify-end gap-2">
                    <button onClick={handleSave} className="text-green-400 hover:text-green-300"><Check size={16} /></button>
                    <button onClick={() => setIsEditing(false)} className="text-red-400 hover:text-red-300"><X size={16} /></button>
                </div>
            </li>
        );
    }

    return (
        <li className="bg-neutral-800 p-3 rounded-xl border border-neutral-700 flex flex-col hover:bg-neutral-700 transition">
            <div className="flex justify-between items-center">
                <span className="font-semibold">{bug.title}</span>
                <span
                    className={`text-xs px-2 py-0.5 rounded-full font-mono ${bug.status === "bug"
                        ? "bg-red-400 text-black"
                        : bug.status === "fixing"
                            ? "bg-yellow-600 text-white"
                            : "bg-green-400 text-black"
                        }`}
                >
                    {bug.status}
                </span>
            </div>
            {bug.description && (
                <p className="text-sm text-neutral-300 mt-1">{bug.description}</p>
            )}
            <div className="flex gap-2 mt-2 self-end">
                <button onClick={() => setIsEditing(true)} className="hover:text-yellow-400"><Edit3 size={16} /></button>
                <button onClick={() => onDelete(bug._id)} className="hover:text-red-500"><Trash2 size={16} /></button>
            </div>
        </li>
    );
}
