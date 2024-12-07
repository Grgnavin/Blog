"use client";
import ShowBlogs from '@/components/Showblogs';
import { useParams, useRouter } from 'next/navigation'
import React, { useState } from 'react'

export type BlogPost = {
    id: number;
    title: string;
    description: string;
    author: string;
    date: string;
    image: string;
}

const BlogPosts:BlogPost[]  = [
    {
        id: 1,
        title: 'AI in Cybersecurity',
        description: 'An overview of blockchain and its transformative potential. An overview of blockchain and its transformative potential.An overview of blockchain and its transformative potential.An overview of blockchain and its transformative potential.An overview of blockchain and its transformative potential.An overview of blockchain and its transformative potential.',
        author: 'Navin Gurung',
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

const Page: React.FC = () => {
    const { id } = useParams();
    const router  = useRouter();
    const [blogPosts, setBlogPosts] = useState<BlogPost[]>(BlogPosts);

    const findBlog = blogPosts.find((x: BlogPost) => x.id === Number(id));

    const deleteBlog = (id: number) => {
        setBlogPosts(prev => prev.filter((blog: BlogPost) => blog.id !== id));
        router.push('/')
    };

    if (!findBlog) {
        return <div className='text-center text-white'>No blogs found for this id...</div>
    }
        return (
        <div className='flex flex-col items-center justify-center max-w-3xl mx-auto p-8 rounded-lg shadow-lg'>
            <ShowBlogs blog={findBlog} deleteBlog={deleteBlog} />       
        </div>
    )
}

export default Page; 