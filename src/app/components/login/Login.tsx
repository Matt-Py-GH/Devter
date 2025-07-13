'use client';

import { useState, FormEvent } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError("");

        if (!email || !password) {
            setError("Todos los campos son obligatorios");
            return;
        }

        setLoading(true);

        const res = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });

        if (res?.error) {
            if (res.error === "Invalid credentials") {
                setError("Email o contraseña incorrectos");
            } else {
                setError("Ocurrió un error al iniciar sesión");
            }
            setLoading(false);
        } else {
            router.push("/dashboard");
        }
    };

    return (
        <>
            <h1 className="text-6xl text-center mt-4">Devter</h1>
            <div className="mt-30 flex items-center justify-center">
                <form
                    onSubmit={handleSubmit}
                    className="border border-white max-w-md mt-0 p-6 shadow-md rounded flex flex-col gap-4 bg-neutral-900 rounded-2xl"
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
                        disabled={loading}
                        className={`w-full py-2 rounded transition-colors ${loading
                                ? "bg-neutral-500 text-white cursor-not-allowed"
                                : "bg-white text-black hover:bg-violet-200 cursor-pointer"
                            }`}
                    >
                        {loading ? "Ingresando..." : "Ingresar"}
                    </button>

                    <p className="text-white text-sm text-center mt-2">
                        ¿No tienes una cuenta?{" "}
                        <Link href="/register" className="text-blue-500 hover:underline">
                            Regístrate
                        </Link>
                    </p>
                </form>
            </div>
        </>
    );
}
