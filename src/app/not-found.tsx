import Link from "next/link";
import type { Metadata } from "next";

// Metadata para evitar indexación de páginas 404
export const metadata = (): Metadata => ({
    title: "Not found | Devter",
    description: "La página que estás buscando no existe.",
    robots: {
        index: false,
        follow: false,
    },
});

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white px-4">
            <h1 className="text-6xl font-bold mb-4">404</h1>
            <p className="text-lg text-neutral-400 mb-6 text-center">
                Ups... no encontramos esa página.
            </p>
            <Link
                href="/"
                className="bg-white text-black px-6 py-2 rounded hover:bg-violet-200 transition-colors"
            >
                Volver al inicio
            </Link>
        </div>
    );
}
