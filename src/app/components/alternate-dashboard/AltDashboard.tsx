// AltDashboard.tsx
"use client";

type Props = {
    current: "main" | "secondary";
    onToggle: () => void;
};

export default function AltDashboard({ current, onToggle }: Props) {
    const isMain = current === "main";

    return (
        <button
            onClick={onToggle}
            className="relative mt-2 w-[200px] h-[37px] bg-neutral-800 rounded-full border border-neutral-700 shadow-md text-sm font-mono text-white flex items-center justify-between px-2 cursor-pointer transition-colors hover:bg-neutral-700">
            {/* Indicador deslizante */}
            <span
                className={`absolute top-1 left-1 ${isMain ? "w-[55px] translate-x-3.5" : "w-[105px] translate-x-[83px]"
                    } h-[27px] rounded-full bg-neutral-600 transition-all duration-300`} />

            {/* Etiquetas */}
            <span
                className={`relative z-10 w-[75px] text-center transition-colors ${isMain ? "text-white" : "text-neutral-400"
                    }`}>
                Main
            </span>
            <span
                className={`relative z-10 w-[95px] text-center transition-colors ${isMain ? "text-neutral-400" : "text-white"
                    }`}>
                Secondary
            </span>
        </button>
    );
}
