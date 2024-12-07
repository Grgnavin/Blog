"use client";
import { Blog, useBlogStore } from '@/app/store/blogstore';
import ShowBlogs from '@/components/Showblogs';
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export type BlogPost = {
    id: number;
    title: string;
    description: string;
    author: string;
    date: string;
    image: string;
}

const Page: React.FC = () => {
    const { id } = useParams(); // Get the id from URL
    const { allBlogs, updateBlog, deleteBlog } = useBlogStore();

    const findBlog = allBlogs.find((x: Blog) => x._id === id);

    if (!findBlog) {
        return <div className='text-center text-white'>No blogs found for this id...</div>;
    }

    // Pass both `findBlog` and the `updateBlog` function to ShowBlogs
    return (
        <div className='flex flex-col items-center justify-center max-w-3xl mx-auto p-8 rounded-lg shadow-lg'>
            <ShowBlogs blog={findBlog} updateblog={updateBlog} deleteblog={deleteBlog}/>
        </div>
    );
};


export default Page; 