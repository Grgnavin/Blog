"use client"; 
import { usePathname } from "next/navigation"; 
import { SessionProvider } from "next-auth/react";
import Topbar from "@/components/sections/Topbar";

export default function ClientSessionProvider({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    // Define the pages where the Topbar should not appear
    const hideTopbar = ["/login", "/signup"].includes(pathname);
    return <SessionProvider>
            {!hideTopbar && <Topbar />}
            {children}
        </SessionProvider>;
}
