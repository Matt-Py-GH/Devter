'use client';
import { useState } from "react";
import axios from "axios"
import { FormEvent } from "react";

export default function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        axios.post("/api/auth/signup", { username, password, email })
            .then((res) => {
                console.log(res.data);
                alert("User registered successfully!");
                setUsername("");
                setPassword("");
                setEmail("");
            })
            .catch((err) => {
                console.error(err);
            });
    };
    return (
        <div>
            <form onSubmit={handleSubmit} className="border border-white max-w-md mx-auto mt-10 p-4 shadow-md rounded gap-2 flex flex-col">
                <h1>Register - Devlter</h1>
                <input
                    type="text"
                    name="username"
                    placeholder="username"
                    className="block px-4 py-2 mb2 border border-white"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)} />

                <input
                    type="email"
                    name="email"
                    placeholder="email"
                    className="block px-4 py-2 mb2 border border-white"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} />


                <input
                    type="password"
                    name="password"
                    placeholder="password"
                    className="block px-4 py-2 mb2 border border-white"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} />

                <button
                    className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 transition-colors">
                    Register
                </button>
            </form>
        </div>
    )
}