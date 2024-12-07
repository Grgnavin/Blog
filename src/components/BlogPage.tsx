'use client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { Button } from './ui/button';
import { DialogTrigger } from '@radix-ui/react-dialog';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Separator } from './ui/separator';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';

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
    const [updateData, setUpdateData] = useState({
        title: "",
        author: "",
        description: "",
        image: "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setUpdateData((prev: any) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleUpdate = () => {
        console.log('Updated Blog Data:', updateData);
        // Handle the update logic here (e.g., API call)
    };
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
            <Dialog>
                <DialogTrigger asChild>
                <Button
                    className="bg-black text-white p-6 text-semibold rounded-full border border-gray-300 transition transform hover:scale-110"
                >
                    + Add Blog
            </Button>
            </DialogTrigger>
            <DialogContent className="p-6 rounded-lg bg-black">
                <DialogHeader>
                <DialogTitle className=" text-center text-2xl text-white">
                    Update Blog
                </DialogTitle>
                    <DialogDescription className="text-sm text-gray-300 text-center">
                        Update the fields below to modify your blog details.
                    </DialogDescription>
              {/* Separator added below the dialog title */}
                <Separator className="my-4 border-purple-300" />
                </DialogHeader>
                    <form className="space-y-4">
                    <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-300">
                                Title
                            </label>
                    <Input
                        id="title"
                        name="title"
                        value={updateData.title}
                        onChange={handleInputChange}
                        className="mt-1 block w-full text-gray-300"
                    />
                    </div>
                    <div>
                <label htmlFor="author" className="block text-sm font-medium text-gray-300">
                    Author
                </label>
                    <Input
                        id="author"
                        name="author"
                        value={updateData.author}
                        onChange={handleInputChange}
                        className="mt-1 block w-full text-gray-300"
                    />
                </div>
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-300">
                        Description
                    </label>
                    <Textarea
                        id="description"
                        name="description"
                        value={updateData.description}
                        onChange={handleInputChange}
                        className="mt-1 block w-full text-gray-300"
                        rows={8}
                    />
                </div>
                <div>
                    <label htmlFor="image" className="block text-sm font-medium text-gray-300">
                        Image URL
                    </label>
                <Input
                    id="image"
                    name="image"
                    type="file"
                    onChange={handleInputChange}
                    className="mt-1 block w-full text-gray-300"
                />
                </div>
                <Button
                    onClick={handleUpdate}
                    className="mt-4 px-6 py-2 text-white border border-gray-300 rounded-lg shadow w-full"
                >
                    Save Changes
                </Button>
            </form>
            </DialogContent>
        </Dialog>
            
        </div>
        </div>
    );
};

export default BlogPage;