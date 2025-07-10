'use client';

import axios from "axios";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterForm() {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");

        try {
            await axios.post("/api/auth/signup", { username, password, email });
            router.push("/login");
        } catch (err: any) {
            setError(err.response?.data?.message || "Error al registrar");
        }
    };

    return (
        <>

            <h1 className="text-6xl text-center mt-4">Devlter</h1>
            <div className="mt-30 flex items-center justify-center">
                <form
                    onSubmit={handleSubmit}
                    className="border border-white max-w-md mt-0 p-6 shadow-md rounded flex flex-col gap-4 bg-neutral-900 rounded-2xl"
                >
                    <h1 className="text-white text-2xl font-semibold text-center">Registro</h1>

                    <input
                        type="text"
                        placeholder="Username"
                        className="px-4 py-2 bg-neutral-800 text-white border border-neutral-700 rounded focus:outline-none"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <input
                        type="email"
                        placeholder="Email"
                        className="px-4 py-2 bg-neutral-800 text-white border border-neutral-700 rounded focus:outline-none"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        className="px-4 py-2 bg-neutral-800 text-white border border-neutral-700 rounded focus:outline-none"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    {error && <p className="text-red-500 text-sm">{error}</p>}

                    <button
                        type="submit"
                        className="bg-white text-black py-2 rounded hover:bg-violet-200 transition-colors hover:cursor-pointer"
                    >
                        Registrarse
                    </button>
                    <p className="text-white text-sm text-center mt-2">
                        ¿Ya tienes una cuenta?{" "}
                        <Link href="/login" className="text-blue-500 hover:underline">
                            Inicia sesión
                        </Link>
                    </p>
                </form>
            </div>
        </>);
}
