import { useState } from "react";

export default function Book() {
    const [bookOpen, setBookOpen] = useState(false);

    return (
        <div >
            {bookOpen ? (
                <div
                    className="ml-[270px] mt-10 w-96 h-80 bg-gradient-to-br from-neutral-900 to-black rounded-br-lg shadow-lg flex cursor-pointer hover:scale-105 transition-transform duration-300">
                    {/* Lomo del cuaderno */}
                    <div className="w-6 bg-neutral-700 flex flex-col items-center justify-center shadow-inner" />

                    {/* Tapa del cuaderno */}
                    <div className="flex flex-1 rounded-tr-lg bg-neutral-900 p-4 flex flex-col justify-between rounded-br-lg">
                        <div className="text-neutral-100 text-lg font-bold font-mono">
                            Notebook
                        </div>
                        <button onClick={() => setBookOpen(!bookOpen)}>pene</button>
                    </div>
                </div>
            ) : (
                <div className="ml-[270px] mt-10 w-96 h-80 bg-neutral-900 rounded-lg shadow-lg p-4">
                    <textarea
                        className="w-full h-full bg-neutral-800 text-white p-2 rounded resize-none"
                        placeholder="Escribe tus notas..."
                    />
                </div>
            )}
        </div>
    );
}
