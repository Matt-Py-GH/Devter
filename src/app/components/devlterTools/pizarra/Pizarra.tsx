'use client';


import { useRef, useState, useEffect } from "react";
import { Minus, Trash2, Brush } from "lucide-react";

export default function PaintWindow() {
    const [isMinimized, setIsMinimized] = useState(true);
    const [isDragging, setIsDragging] = useState(false);
    const [pos, setPos] = useState({ x: 330, y: 80 });
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const isDrawing = useRef(false);

    // Mover ventana
    useEffect(() => {
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
    }, [isDragging]);

    // Dibujo
    useEffect(() => {
        if (isMinimized) return;
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
    }, [isMinimized]);

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    return (
        <div
            style={{ left: pos.x, top: pos.y }}
            className="fixed z-50"
        >
            {isMinimized ? (
                <div className="relative group">
                    <div
                        onContextMenu={(e) => e.preventDefault()}
                        onMouseDown={(e) => {
                            if (e.button === 2) setIsDragging(true);
                        }}
                        onClick={() => setIsMinimized(false)}
                        className="bg-neutral-800 text-white text-xs px-3 py-1 rounded-full cursor-pointer shadow-lg border border-white hover:bg-neutral-700 transition">
                        <Brush size={16} />
                    </div>
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition pointer-events-none whitespace-nowrap shadow">
                        Open paint
                    </span>
                </div>
            ) : (
                <div className="w-[700px] h-[400px] bg-black border border-white rounded-lg">
                    <div
                        className="flex justify-between items-center bg-white text-black text-sm px-3 py-1 cursor-move rounded-t-lg select-none"
                        onContextMenu={(e) => e.preventDefault()}
                        onMouseDown={(e) => {
                            if (e.button === 2) setIsDragging(true);
                        }}
                    >
                        <Brush size={16} /> Paint
                        <div className="flex items-center gap-2">
                            <button
                                onClick={clearCanvas}
                                className="text-xs px-2 py-0.5 bg-neutral-200 rounded hover:bg-neutral-300 transition"
                            >
                                <Trash2 size={14} />
                            </button>
                            <button onClick={() => setIsMinimized(true)}>
                                <Minus size={16} />
                            </button>
                        </div>
                    </div>
                    <canvas ref={canvasRef} width={700} height={360} className="cursor-crosshair" />
                </div>
            )}
        </div>
    );
}
