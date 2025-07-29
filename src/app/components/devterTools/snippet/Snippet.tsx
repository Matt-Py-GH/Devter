import { useEffect, useState } from "react";
import SnippetModal from "./SnippetModal";
import axios from "axios";


type Snippet = {
    _id: string
    title: string
    description: string
    code: string
}

export default function Snippet() {
    const [open, setOpen] = useState(false)
    const [snippets, setSnippets] = useState<Snippet[]>([])
    const [error, setError] = useState<Error | string | null>(null)

    useEffect(() => {

    }, [fetchSnippets()])

    async function fetchSnippets() {
        try {
            const res = await axios.get("/api/snippet")
            setSnippets(res.data)
        }
        catch (error: unknown) {
            setError(error instanceof Error ? error.message : "Unknown error ocurred")
        }
    }

    return (
        <div className="flex flex-col items-center justify-center hover:bg-neutral-800 transition-all duration-300 cursor-pointer w-[25%] rounded-lg">
            <button onClick={() => setOpen(!open)} className="bg-neutral-900 text-white p-2 rounded cursor-pointer w-full">
                O
            </button>
            {open && (
                <div className="">
                    <input type="search" />
                    <ul>
                        {snippets.map(snip => (
                            <li key={snip._id} className="p-2 border-b border-neutral-700">
                                <h3 className="font-bold">{snip.title}</h3>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}