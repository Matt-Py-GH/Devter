'use client';

import { useState, FormEvent } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const [error, setError] = useState("");

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError("");

        const res = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });

        if (res?.error) {
            setError("Credenciales inválidas");
        } else {
            router.push("/");
        }
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center">
            <form
                onSubmit={handleSubmit}
                className="bg-neutral-900 p-6 rounded-2xl shadow-md w-full max-w-sm"
            >
                <h1 className="text-white text-2xl font-semibold mb-6 text-center">
                    Iniciar sesión
                </h1>

                <input
                    type="email"
                    placeholder="Email"
                    className="w-full bg-neutral-800 text-white border border-neutral-700 px-4 py-2 rounded mb-4 focus:outline-none focus:border-indigo-500"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Contraseña"
                    className="w-full bg-neutral-800 text-white border border-neutral-700 px-4 py-2 rounded mb-4 focus:outline-none focus:border-indigo-500"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                <button
                    type="submit"
                    className="w-full bg-white text-black py-2 rounded hover:bg-neutral-200 transition-colors"
                >
                    Ingresar
                </button>
            </form>
        </div>
    );
}
