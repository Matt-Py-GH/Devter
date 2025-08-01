"use client";

import ProfileButton from "../profile-button/ProfileButton";
import { useProjectTitle } from "@/hooks/useProjectTitle";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";


import AltDashboard from "../alternate-dashboard/AltDashboard";

export default function Header() {
    const { title, setTitle, loading } = useProjectTitle();
    const router = useRouter();

    const [currentDashboard, setCurrentDashboard] = useState<"main" | "secondary">("main");

    useEffect(() => {
        const saved = localStorage.getItem("currentDashboard");
        if (saved === "secondary") setCurrentDashboard("secondary");
    }, []);

    const toggleDashboard = () => {
        const next = currentDashboard === "main" ? "secondary" : "main";
        setCurrentDashboard(next);
        localStorage.setItem("currentDashboard", next);
        router.push(next === "main" ? "/" : "/secondary");
    };

    const headerClass = "text-white flex items-center justify-between px-4 py-2 h-16 text-xl";

    const inputClass = "text-white px-3 hover:bg-neutral-900 py-1 ml-5 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 placeholder-gray-400 w-full max-w-xs text-4xl mt-4"

    return (
        <header className={headerClass}>
            <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Project Title"
                disabled={loading}
                className={inputClass}
            />
            <div className="flex gap-5">
                <AltDashboard
                    current={currentDashboard}
                    onToggle={toggleDashboard}

                />
                <ProfileButton />
            </div>
        </header>
    );
}
