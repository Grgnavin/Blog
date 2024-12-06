import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession, signIn, signOut } from 'next-auth/react';

const Topbar = () => {
    const { data: session, status } = useSession();
    console.log(session);

    const router = useRouter();
    const [loading, setLoading] = useState(true); // Track loading state

    useEffect(() => {
        if (status === "loading") {
        setLoading(true); // Wait until session is loaded
        } else {
        setLoading(false); // Session is loaded, stop loading
        }
    }, [status]);

    const user = session?.user;

    const Logout = async () => {
        await signOut();
        router.push('/api/auth/signin');
    };

    const handleAuth = () => {
        if (user) {
            Logout();
        } else {
            signIn(); // This will use the default provider if you don't pass parameters
        }
    };

    // Check if session is still loading before rendering
    if (loading) return <div>Loading...</div>;

    return (
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <header className="fixed top-0 left-0 w-full bg-white/10 backdrop-blur-md shadow-md">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
            {/* Logo */}
            <div className="flex items-center space-x-2">
                <div className="bg-green-500 h-8 w-8 rounded-full flex items-center justify-center">
                <span className="text-xl font-bold text-black">BA</span>
                </div>
                <span className="text-lg font-semibold">Builders Academy</span>
            </div>

            {/* Navigation */}
            <nav className="flex items-center space-x-8">
                <Link href="#programs" className="hidden md:block text-white hover:text-green-400">
                    Programs
                </Link>
                <Link href="/blogs" className="hidden md:block text-white hover:text-green-400">
                    Blogs
                </Link>
                <Link href="#careers" className="hidden md:block text-white hover:text-green-400">
                    Careers
                </Link>
                <button
                className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-full"
                onClick={handleAuth}
                >
                    {user ? "Logout" : "Login"}
                </button>
            </nav>
            </div>
        </header>
        </div>
);
}

export default Topbar;
