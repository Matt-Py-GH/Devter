'use client';


import { useRef, useEffect } from "react";
import { Trash2, Brush } from "lucide-react";

export default function PaintWindow() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const isDrawing = useRef(false);

    // Resize dinámico
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        // Seteo inicial del tamaño
        const setCanvasSize = () => {
            canvas.width = window.innerWidth - 32; // o ajustalo como necesites
            canvas.height = 500;
        };

        setCanvasSize();

        window.addEventListener("resize", setCanvasSize);
        return () => window.removeEventListener("resize", setCanvasSize);
    }, []);

    // Dibujo
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let lastX = 0;
        let lastY = 0;

        const startDrawing = (e: MouseEvent) => {
            if (e.button !== 0) return;
            isDrawing.current = true;
            const rect = canvas.getBoundingClientRect();
            lastX = e.clientX - rect.left;
            lastY = e.clientY - rect.top;
        };

        const draw = (e: MouseEvent) => {
            if (!isDrawing.current) return;
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            ctx.strokeStyle = "white";
            ctx.lineWidth = 2;
            ctx.lineCap = "round";

            ctx.beginPath();
            ctx.moveTo(lastX, lastY);
            ctx.lineTo(x, y);
            ctx.stroke();

            lastX = x;
            lastY = y;
        };

        const stopDrawing = () => {
            isDrawing.current = false;
        };

        canvas.addEventListener("mousedown", startDrawing);
        canvas.addEventListener("mousemove", draw);
        canvas.addEventListener("mouseup", stopDrawing);
        canvas.addEventListener("mouseleave", stopDrawing);

        return () => {
            canvas.removeEventListener("mousedown", startDrawing);
            canvas.removeEventListener("mousemove", draw);
            canvas.removeEventListener("mouseup", stopDrawing);
            canvas.removeEventListener("mouseleave", stopDrawing);
        };
    }, []);

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    return (
        <div className=" bg-black border border-white rounded-lg">
            <div
                className="flex justify-between items-center bg-white text-black text-sm px-3 py-1 cursor-move rounded-t-lg select-none">
                <Brush size={16} /> Paint
                <div className="flex items-center gap-2">
                    <button
                        onClick={clearCanvas}
                        className="text-xs px-2 py-0.5 bg-neutral-200 rounded hover:bg-neutral-300 transition"
                    >
                        <Trash2 size={14} />
                    </button>
                </div>
            </div>
            <canvas ref={canvasRef} height={500} className="cursor-crosshair" />
        </div>
    )
}
