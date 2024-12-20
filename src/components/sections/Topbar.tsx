"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { checkToken } from '@/lib/checkToken';
import { useUserStore } from '@/app/store/userStore';

const Topbar = () => {
    const route = useRouter();
    const { logout } = useUserStore();
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const tokenValue = checkToken();
        setToken(tokenValue);
    }, []); 


    const ClickHandler = async() => {
        if (!token) {
            route.push('/login');
        } else {
            logout();
            localStorage.removeItem('token'); // Remove token on logout
            setToken(null); // Update state
        }
    }

    return (
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <header className="fixed top-0 left-0 w-full bg-white/10 backdrop-blur-md shadow-md">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
            {/* Logo */}
            <div className="flex items-center space-x-2">
                <div className="bg-green-500 h-8 w-8 rounded-full flex items-center justify-center">
                <span className="text-xl font-bold text-black">BA</span>
                </div>
                <span onClick={() => route.push('/')} className="text-lg font-semibold">Builders Academy</span>
            </div>

            {/* Navigation */}
            <nav className="flex items-center space-x-8">
                <Link href="/programs" className="hidden md:block text-white hover:text-green-400">
                    Programs
                </Link>
                <Link href="/blogs" className="hidden md:block text-white hover:text-green-400">
                    Blogs
                </Link>
                <Link href="careers" className="hidden md:block text-white hover:text-green-400">
                    Careers
                </Link>
                <button
                onClick={ClickHandler}
                className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-full"
                >
                    {
                        token ? "Logout" : "Login"
                    }
                </button>
            </nav>
            </div>
        </header>
        </div>
);
}

export default Topbar;
