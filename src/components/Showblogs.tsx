import React, { useState } from 'react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from './ui/dialog'; // Import DialogDescription
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Separator } from './ui/separator';
import { BlogPost } from '@/app/(FE)/blogs/[id]/page';

const ShowBlogs = ({ blog, deleteBlog }: { blog: BlogPost, deleteBlog: (id: number) => void }) => {
    const [updateData, setUpdateData] = useState({
        title: blog.title,
        author: blog.author,
        description: blog.description,
        image: blog.image,
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setUpdateData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleUpdate = () => {
        console.log('Updated Blog Data:', updateData);
        // Handle the update logic here (e.g., API call)
    };

    return (
        <div className="pr-8 pl-8 pt-8 overflow-hidden rounded-lg border border-purple-500 border-none min-h-screen">
            <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-75 object-cover rounded-t-lg"
            />  
            <h1 className="text-3xl font-bold text-purple-400 mb-4 text-center p-2">{blog.title}</h1>
            <p className="text-gray-400 mb-6 px-2">{blog.description}</p>
            <div className="text-sm text-gray-500 flex justify-between">
                <span>By {blog.author}</span>
                <span>{blog.date}</span>
            </div>
        <div className="p-4 flex justify-end gap-4">
            <Dialog>
                <DialogTrigger asChild>
                    <Button className="px-6 py-2 text-white border border-gray-300 rounded-lg shadow hover:scale-105">
                        Update Blog 
                    </Button>
            </DialogTrigger>
            <DialogContent className="p-6 rounded-lg bg-black">
                <DialogHeader>
                <DialogTitle className="text-white text-center text-2xl">
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
                    className="mt-4 px-6 py-2 text-white hover:scale-105 border border-gray-300 rounded-lg shadow w-full"
                >
                    Save Changes
                </Button>
            </form>
            </DialogContent>
        </Dialog>
            <Button 
                className="border border-gray-300 px-6 py-2 text-white rounded-lg hover:scale-105"
                onClick={() => deleteBlog(blog.id)}
                >
                Delete Blog
            </Button>
        </div>
    </div>
);
};

export default ShowBlogs;