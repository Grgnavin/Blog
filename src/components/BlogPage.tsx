'use client';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { DialogTrigger } from '@radix-ui/react-dialog';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Separator } from './ui/separator';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Loader2 } from 'lucide-react';
import { useBlogStore } from '@/app/store/blogstore';

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
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setUpdateData((prev: any) => ({
            ...prev,
            [name]: value,
        }));
    };
    const { allBlogs ,getAllBlogs } = useBlogStore();
    const SubmitHandler = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Handle the update logic here (e.g., API call
        try {
            const formdata = new FormData();
            formdata.append("title", updateData.title);
            formdata.append("description", updateData.description);
            formdata.append("author", updateData.author);
            if (file) {
                formdata.append("image", file);
            }
            await createBlog(formdata);
            router.push('/blogs');
        } catch (error) {
            console.log(error);
        }
        setUpdateData({
            title: "",
            author: "",
            description: "",
            image: undefined,
        });
    };

    useEffect(() => {
        getAllBlogs();
    },[]);

    return (
        <div className="bg-black text-white min-h-screen p-8">
        <h1 className="text-4xl font-bold text-center text-gray-300 mb-8 p-4">Latest Blogs</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {allBlogs.length > 0 &&
                    allBlogs.map((post) => {
                        // Convert the createdAt string to a Date object
                        const createdAtDate = new Date(post.createdAt);
                        const formattedDate = createdAtDate.toLocaleDateString(); // You can format this as needed
                        return (
                            <div
                                key={post?._id}
                                className="bg-gray-800 rounded-lg shadow-lg overflow-hidden transition hover:shadow-xl hover:scale-105 border border-purple-300"
                                onClick={() => router.push(`/blogs/${post._id}`)}
                            >
                                <img
                                    loading="lazy"
                                    src={post.file}
                                    alt={post.title}
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
                    Add Blog
                </DialogTitle>
                    <DialogDescription className="text-sm text-gray-300 text-center">
                        Give all the information for your blog
                    </DialogDescription>
                {/* Separator added below the dialog title */}
                <Separator className="my-4 border-purple-300" />
                </DialogHeader>
                    <form onSubmit={SubmitHandler} className="space-y-4">
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
                    {
                        error && <span className='text-xs text-red-600 font-medium'>{error.title}</span>
                    }
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
                    {
                        error && <span className='text-xs text-red-600 font-medium'>{error.author}</span>
                    }
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
                    {
                        error && <span className='text-xs text-red-600 font-medium'>{error.description}</span>
                    }
                </div>
                <div>
                    <label htmlFor="image" className="block text-sm font-medium text-gray-300">
                        Image URL
                    </label>
                    <Input
                        name="image"
                        type="file"
                        onChange={(e) => setfile(e.target.files?.[0])}
                        className="mt-1 block w-full text-gray-300"
                    />
                </div>
                    <Button
                        type='submit'
                        className="mt-4 px-6 py-2 text-white border border-gray-300 rounded-lg shadow w-full"
                        disabled={loading} // Disable button while loading
                    >
                        {loading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Please wait
                            </>
                        ) : (
                            'Submit'
                        )}
                    </Button>
            </form>
            </DialogContent>
        </Dialog>
            
        </div>
        </div>
    );
};

export default BlogPage;