'use client';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import { useBlogStore } from '@/app/store/blogstore';
import AddBlog from './AddBlog';

export type BlogFormSchema = {
    title: string;
    description: string;
    author: string;
    image: string;
}

const BlogPage: React.FC = () => {
    const [updateData, setUpdateData] = useState({
        title: "",
        author: "",
        description: "",
        image: undefined,
    });
    const[file, setfile] = useState<File | undefined>();
    const [error, setError] = useState<Partial<BlogFormSchema>>();
    const router = useRouter();
    const { loading ,createBlog } = useBlogStore();
    const { allBlogs ,getAllBlogs } = useBlogStore();

    useEffect(() => {
        getAllBlogs();
    },[]);

    return (
        <div className="bg-black text-white min-h-screen p-8">
        <h1 className="text-4xl font-bold text-center text-gray-300 mb-8 p-4">Latest Blogs</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {allBlogs.length > 0 &&
                    allBlogs.map((post) => {
                        const createdAtDate = new Date(post.createdAt);
                        const formattedDate = createdAtDate.toLocaleDateString(); // You can format this as needed
                        return (
                            <div
                                key={post?._id}
                                className="bg-gray-950 rounded-lg shadow-lg overflow-hidden transition hover:shadow-xl hover:scale-105 border border-purple-300"
                                onClick={() => router.push(`/blogs/${post._id}`)}
                            >
                                <img
                                    src={post.file}
                                    alt={post.title}
                                    width={24}
                                    height={24}
                                    className="w-full h-40 object-cover border border-gray-300"
                                />
                                <div className="p-6">
                                    <h2 className="text-xl font-bold text-gray-300 mb-2 text-center">{post.title.toLocaleUpperCase()}</h2>
                                    <p className="text-gray-400 mb-4 text-center">{post.content}</p>
                                    <div className="flex justify-between items-center text-gray-400 text-sm">
                                        <span>By {post.author.username}</span>
                                        <span>{formattedDate}</span> {/* Display the formatted date */}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
        </div>

        <div className="fixed bottom-10 right-9">
            <AddBlog loading={loading} error={error}/>
        </div>
        </div>
    );
};

export default BlogPage;