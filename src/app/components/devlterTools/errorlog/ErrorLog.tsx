'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import axios from 'axios';

import Adder from '../adderComponent/Adder';
import { Bug } from '../adderComponent/Adder';
import BugCard from '../cardComponent/CardComponent';


export default function MiniErrorLog() {
    const [addButton, setAddButton] = useState("+")
    const [adderOpen, setAdderOpen] = useState(false)
    const [open, setOpen] = useState(false)
    const [bugs, setBugs] = useState<Bug[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("");

    const updateBug = async (updatedBug: Bug) => {
        setLoading(true);
        setError(null);
        try {
            const res = await axios.patch("/api/bugs", updatedBug)
            const newBug = res.data;

            setBugs(prev =>
                prev.map(bug => (bug._id === newBug._id ? newBug : bug))
            );

        } catch (error: any) {
            setError(error.response?.data?.message || error.message);
        }
        finally {
            setLoading(false)
        }
    }

    const deleteBug = async (bugId: string) => {
        console.log("Deleting bug with ID:", bugId);
        setLoading(true);
        setError(null);
        try {
            const res = await axios.delete("/api/bugs", { data: { id: bugId } });
            console.log("Delete response:", res.data);
            setBugs(bugs.filter(bug => bug._id !== bugId));
        } catch (e: any) {
            setError(e.message);
        }
        finally {
            setLoading(false);
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
            setLoading(true);
            setError(null);
            try {
                const res = await fetch("/api/bugs");
                if (!res.ok) throw new Error("Error al cargar bugs");
                const data = await res.json();
                setBugs(data);
            } catch (e: any) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
        }

        fetchBugs();
    }, []);

    const toggleTop = '80px'
    const panelTop = '120px'

    return (
        <>
            {/* Toggle lateral */}
            <div
                onClick={() => {
                    setOpen(!open)
                    setAdderOpen(false)
                    setAddButton("+")
                }}
                className="fixed left-0 z-40 flex items-center gap-2 bg-neutral-900 text-white px-3 py-2 rounded-r-2xl shadow-md cursor-pointer select-none border border-white/10 transition-all"
                style={{ top: toggleTop }}>

                <span className="font-mono text-sm">Errors</span>
                {open ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
            </div>

            {adderOpen ? (<Adder location='error' api='/api/bugs' onItemAdded={(newError) => setBugs(prev => [newError as Bug, ...prev])} />) : null}
            {/* Panel deslizable */}
            <div
                className={`fixed left-0 w-90 bg-neutral-900 text-white shadow-2xl z-30 transition-transform duration-300 ease-in-out rounded-r-2xl border-r border-white/10 ${open ? 'translate-x-0' : '-translate-x-full'}`}
                style={{ top: panelTop, height: `calc(100vh - ${panelTop})` }}>

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
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full sm:w-auto flex-grow bg-neutral-800 border border-neutral-600 rounded px-3 py-1 text-sm"
                        />
                        <select
                            value={statusFilter}
                            onChange={e => {
                                setStatusFilter(e.target.value);
                                localStorage.setItem("bugsStatusFilter", e.target.value);
                            }}
                            className="w-full sm:w-auto bg-neutral-800 border border-neutral-600 rounded px-3 py-1 text-sm text-white"
                        >
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
                                    onUpdate={(updatedItem) => {
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
