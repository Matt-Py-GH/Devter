// src/app/profile/ProfileClient.tsx
"use client";

interface Props {
    userName: string;
}

export default function ProfileClient({ userName }: Props) {
    return (
        <>
            <h1 className="text-white text-3xl mt-10 text-center">
                Perfil de {userName}
            </h1>
            {/* Aquí agregás la UI y lógica del perfil */}
        </>
    );
}
