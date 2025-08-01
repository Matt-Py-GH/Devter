'use client'

import { useState, useEffect } from 'react'

import axios from 'axios';

import Adder from '../adderComponent/Adder';
import { Bug } from '../adderComponent/Adder';
import BugCard from '../cardComponent/CardComponent';


export default function ErrorLog() {
    const [addButton, setAddButton] = useState("+")
    const [adderOpen, setAdderOpen] = useState(false)
    const [bugs, setBugs] = useState<Bug[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("");

    const updateBug = async (updatedBug: Bug) => {
        try {
            const res = await axios.patch("/api/bugs", updatedBug)
            const newBug = res.data;

            setBugs(prev =>
                prev.map(bug => (bug._id === newBug._id ? newBug : bug))
            );

        } catch (error: unknown) {
            console.log(error)
        }
    }

    const deleteBug = async (bugId: string) => {
        console.log("Deleting bug with ID:", bugId);
        try {
            const res = await axios.delete("/api/bugs", { data: { id: bugId } });
            console.log("Delete response:", res.data);
            setBugs(bugs.filter(bug => bug._id !== bugId));
        } catch (e: unknown) {
            console.log(e);
        }
        finally {
            ;
        }
    }

    const filteredBugs = bugs.filter(bug =>
        bug.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (statusFilter ? bug.status === statusFilter : true)
    );

    useEffect(() => {
        const storedFilter = localStorage.getItem("bugsStatusFilter");
        setStatusFilter(storedFilter || "")
        async function fetchBugs() {
            try {
                const res = await axios.get("/api/bugs");
                setBugs(res.data);
            } catch (e: unknown) {
                console.log(e);
            } finally {
                ;
            }
        }

        fetchBugs();
    }, [setBugs]);

    return (
        <>

            {/* Panel deslizable */}
            <div
                className={`bg-neutral-900 text-white shadow-2xl transition-transform duration-300 ease-in-out rounded-2xl border-r border-white/10 p-6`}>
                {adderOpen ? <Adder location='error' api='/api/bugs' onItemAdded={(newError) => setBugs(prev => [newError as Bug, ...prev])} /> : null}

                <div className="relative flex flex-col h-full">
                    {/* Header */}
                    <div className="p-4 border-b border-white/10 font-mono text-lg">
                        ErrorLog
                    </div>

                    {/* Botón + en esquina superior derecha */}
                    <button
                        type="button"
                        className="absolute top-3 right-3 w-5 h-5 flex items-center justify-center rounded-full bg-black hover:bg-neutral-700 text-white font-bold text-lg select-none shadow-md cursor-pointer"
                        aria-label="Agregar error"
                        onClick={() => {
                            setAdderOpen(!adderOpen)
                            setAddButton(addButton === "x" ? "+" : "x")
                        }}>
                        {addButton}
                    </button>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 border-b border-neutral-700 pb-4">
                        <input
                            type="search"
                            placeholder="🔍 Buscar por nombre"
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            className="w-full sm:w-auto flex-grow bg-neutral-800 border border-neutral-600 rounded px-3 py-1 text-sm"
                        />
                        <select
                            value={statusFilter}
                            onChange={e => {
                                setStatusFilter(e.target.value);
                                localStorage.setItem("bugsStatusFilter", e.target.value);
                            }}
                            className="w-full sm:w-auto bg-neutral-800 border border-neutral-600 rounded px-3 py-1 text-sm text-white">
                            <option value="">Todos</option>
                            <option value="bug">🔴 Bug</option>
                            <option value="fixing">🟡 Fixing</option>
                            <option value="fixed">🟢 Fixed</option>
                        </select>
                    </div>

                    {/* Contenido scrollable */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-2 font-mono text-sm">
                        {/* Aquí irá la lista de errores */}
                        <ul className="flex-grow overflow-y-auto pr-1 space-y-2">
                            {filteredBugs.map(bug => (
                                <BugCard
                                    key={bug._id}
                                    item={bug}
                                    onDelete={deleteBug}
                                    onUpdate={updatedItem => {
                                        if ('status' in updatedItem && ['bug', 'fixing', 'fixed'].includes(updatedItem.status)) {
                                            updateBug(updatedItem as Bug);
                                        }
                                    }}

                                />
                            ))}
                        </ul>

                    </div>
                </div>
            </div>
        </>
    )
}
