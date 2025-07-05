import { LogOutIcon } from "lucide-react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

interface LogoutButtonProps extends React.HTMLAttributes<HTMLButtonElement> { }

export default function LogoutButton({ ...rest }: LogoutButtonProps) {
    const router = useRouter();
    const logoutClass = "p-3 rounded hover:bg-neutral-800 w-12 h-12 flex items-center justify-center cursor-pointer"
    const handleLogout = async () => {
        try {

            signOut({ redirect: false });
        }
        finally {
            router.push("/login");
        }

    }

    return (
        <button
            onClick={handleLogout}
            {...rest}
            className={logoutClass}>
            <LogOutIcon className="w-8 h-8 cursor-pointer" />
        </button >

    )
}   