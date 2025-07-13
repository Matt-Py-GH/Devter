// src/app/secondary-dashboard/SecondaryDashboardClient.tsx
"use client";

import Header from "../components/header/Header";

interface Props {
    userName: string;
}

export default function SecondaryDashboardClient({ userName }: Props) {
    return (
        <>
            <Header>{`Hello, ${userName}`}</Header>
            {/* Aquí agregás más componentes o funcionalidades para este dashboard */}
        </>
    );
}
