//Client component
"use client";

//React & Next imports
import { useSession } from "next-auth/react";
import { useState } from "react";

//Components
import Header from "../components/header/Header";
import AltDashboard from "../components/alternate-dashboard/AltDashboard";

export default function Dashboard() {
    const { data: session } = useSession();
    const user = session?.user;
    const userName = user?.name || "there!";
    const [isMain, setIsMain] = useState(true);




    return (
        <>
            <Header children={`Hello, ${userName}`} />

        </>
    )
}