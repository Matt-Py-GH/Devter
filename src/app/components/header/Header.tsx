"use client";

import { HTMLAttributes } from "react";
import ProfileButton from "../profile-button/ProfileButton";
import { useProjectTitle } from "@/hooks/useProjectTitle";

interface HeaderProps extends HTMLAttributes<HTMLElement> {
    children: React.ReactNode;
}

export default function Header({ children, ...rest }: HeaderProps) {
    const { title, setTitle, loading, error } = useProjectTitle();

    const headerClass = "text-white flex items-center justify-between px-4 py-2 h-16 gap-4 text-xl";

    const inputClass = "text-white px-3 hover:bg-neutral-900 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 placeholder-gray-400 w-full max-w-xs text-4xl mt-4"

    return (
        <header {...rest} className={headerClass}>
            {children}
            <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Project Title"
                disabled={loading}
                className={inputClass}
            />
            <ProfileButton />
        </header>
    );
}
