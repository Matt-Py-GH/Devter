import { LogOutIcon } from "lucide-react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

interface LogoutButtonProps extends React.HTMLAttributes<HTMLButtonElement> { }

export default function LogoutButton({ ...rest }: LogoutButtonProps) {
    const router = useRouter();
    const logoutClass = "p-3 rounded hover:bg-neutral-800 w-12 h-12 flex items-center justify-center cursor-pointer transition"
    const handleLogout = async () => {
        try {

            signOut({ redirect: false });
        }
        finally {
            router.push("/login");
        }

    }

    return (
        <div className="relative group flex flex-col items-center">
            <button
                onClick={handleLogout}
                {...rest}
                className={logoutClass}
            >
                <LogOutIcon className="w-8 h-8 cursor-pointer" />
            </button>
            <span className="absolute top-full mt-1 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-in-out pointer-events-none whitespace-nowrap shadow z-50">
                Cerrar sesión
            </span>
        </div>




    )
}   