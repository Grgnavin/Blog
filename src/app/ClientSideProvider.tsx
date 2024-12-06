// ClientSessionProvider.tsx
"use client"; 

import Topbar from "@/components/sections/Topbar";
import { SessionProvider } from "next-auth/react";

export default function ClientSessionProvider({ children }: { children: React.ReactNode }) {
    return <SessionProvider>
            <Topbar />
            {children}
        </SessionProvider>;
}
