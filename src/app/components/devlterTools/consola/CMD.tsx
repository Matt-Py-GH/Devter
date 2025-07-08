"use client";

import { useState, useEffect } from "react";
import { ChevronsUp, ChevronsDown } from "lucide-react";

export default function Console() {
    const [open, setOpen] = useState(false);

    return (
        <>
            {/* Consola deslizable */}
            <div
                className={`fixed bottom-0 left-[361px] w-[600px] h-[280px] bg-black text-white border-t border-neutral-700 z-30 transition-transform duration-300 ease-in-out font-mono rounded-t-2xl shadow-xl ${open ? "translate-y-0" : "translate-y-full"}`}>

                {/* Botón arriba del panel */}
                <div
                    onClick={() => setOpen(!open)}
                    className={`absolute -top-[32px] left-1/2 -translate-x-1/2 z-40 cursor-pointer transition-all duration-300
                    ${open ? "h-6" : "h-8"}`}
                >
                    <div className="bg-neutral-800 text-white px-3 py-1 rounded-t-xl border border-neutral-700 shadow-md hover:bg-neutral-700 transition">
                        {open ? <ChevronsDown size={16} /> : <ChevronsUp size={20} />}
                    </div>
                </div>

                <div className="p-4 space-y-2 text-sm overflow-y-auto h-full">
                    <p className="text-white">{">_"}</p>
                    <p className="text-neutral-500"></p>
                </div>
            </div>
        </>
    );
}
