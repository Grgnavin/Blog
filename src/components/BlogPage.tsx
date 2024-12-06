'use client';
import { useRouter } from 'next/navigation';
import React from 'react';

const blogPosts = [
    {
        id: 1,
        title: 'AI in Cybersecurity',
        description: 'An overview of blockchain and its transformative potential. An overview of blockchain and its transformative potential.An overview of blockchain and its transformative potential.An overview of blockchain and its transformative potential.An overview of blockchain and its transformative potential.An overview of blockchain and its transformative potential.',
        author: 'Jane Smith',
        date: 'November 20, 2024',
        image: 'https://securityintelligence.com/wp-content/uploads/2024/10/AI-robot-using-cyber-security-to-protect-information-privacy.jpeg', // Dummy Image
    },
    {
        id: 2,
        title: 'AI in Cybersecurity',
        description: 'An overview of blockchain and its transformative potential. An overview of blockchain and its transformative potential.An overview of blockchain and its transformative potential.An overview of blockchain and its transformative potential.An overview of blockchain and its transformative potential.An overview of blockchain and its transformative potential.',
        author: 'Jane Smith',
        date: 'November 20, 2024',
        image: 'https://www.cyberdb.co/wp-content/uploads/2020/08/ai1.png', // Dummy Image
    },
    {
        id: 3,
        title: 'AI in Cybersecurity',
        description: 'An overview of blockchain and its transformative potential. An overview of blockchain and its transformative potential.An overview of blockchain and its transformative potential.An overview of blockchain and its transformative potential.An overview of blockchain and its transformative potential.An overview of blockchain and its transformative potential.',
        author: 'Jane Smith',
        date: 'November 20, 2024',
        image: 'https://www.cyberdb.co/wp-content/uploads/2020/08/ai1.png', // Dummy Image
    },
    {
        id: 4,
        title: 'AI in Cybersecurity',
        description: 'An overview of blockchain and its transformative potential. An overview of blockchain and its transformative potential.An overview of blockchain and its transformative potential.An overview of blockchain and its transformative potential.An overview of blockchain and its transformative potential.An overview of blockchain and its transformative potential.',
        author: 'Jane Smith',
        date: 'November 20, 2024',
        image: 'https://www.cyberdb.co/wp-content/uploads/2020/08/ai1.png', // Dummy Image
    },
    {
        id: 5,
        title: 'AI in Cybersecurity',
        description: 'An overview of blockchain and its transformative potential. An overview of blockchain and its transformative potential.An overview of blockchain and its transformative potential.An overview of blockchain and its transformative potential.An overview of blockchain and its transformative potential.An overview of blockchain and its transformative potential.',
        author: 'Jane Smith',
        date: 'November 20, 2024',
        image: 'https://www.cyberdb.co/wp-content/uploads/2020/08/ai1.png', // Dummy Image
    },
];

const BlogPage: React.FC = () => {
    const router = useRouter();
    return (
        <div className="bg-black text-white min-h-screen p-8">
        {/* Title Section */}
        <h1 className="text-4xl font-bold text-center text-gray-300 mb-8 p-4">Latest Blogs</h1>
        {/* Blog Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {blogPosts.map((post) => (
            <div key={post.id}
                className="bg-gray-800 rounded-lg shadow-lg overflow-hidden transition hover:shadow-xl hover:scale-105 border border-purple-300"
                onClick={() => router.push(`/blogs/${post.id}`)}
                >
                    <img loading="lazy" src={post.image} alt={post.title} className="w-full h-40 object-cover" />
                    <div className="p-6">
                        <h2 className="text-xl font-bold text-purple-300 mb-2">{post.title}</h2>
                        <p className="text-gray-400 mb-4">{post.description}</p>
                    <div className="flex justify-between items-center text-gray-500 text-sm">
                            <span>By {post.author}</span>
                            <span>{post.date}</span>
                    </div>
                    </div>
            </div>
            ))}
        </div>

        {/* Floating Add Blog Button */}
        <div className="fixed bottom-10 right-9">
            <button
                className="bg-purple-500 text-white p-4 rounded-full shadow-lg hover:bg-purple-700 transition transform hover:scale-110"
                onClick={() => alert('Add Blog Clicked!')}
            >
                + Add Blog
            </button>
        </div>
        </div>
    );
};

export default BlogPage;