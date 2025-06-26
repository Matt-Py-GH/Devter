"use client";

import { useSession } from "next-auth/react";

export default function Dashboard() {
    const { data: session, status, update } = useSession();

    console.log(session, status);

    return (
        <>
            <div>Dashboard</div>
        </>
    )
}