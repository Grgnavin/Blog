import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from './ui/dialog'; // Import DialogDescription
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Separator } from './ui/separator';
import { Blog } from '@/app/store/blogstore';
import { useRouter } from 'next/navigation';

const ShowBlogs = ({ blog, updateblog, deleteblog }: { 
    blog: Blog | null, 
    updateblog: (id: string, formdata: FormData) => Promise<void>, 
    deleteblog: (id: string) => Promise<void>
}) => {
    if (!blog) {
        return <div>Blog not found.</div>;
    }
    const [updateData, setUpdateData] = useState({
        title: blog?.title,
        author: blog?.author.username,
        description: blog?.content,
        image: blog?.file,
    });
    const[file, setfile] = useState<File | undefined>();
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setUpdateData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    const router = useRouter();
    const handleUpdate = async(e: React.FormEvent) => {
        e.preventDefault();
        const formdata = new FormData();
            formdata.append("title", updateData.title);
            formdata.append("description", updateData.description);
            formdata.append("author", updateData.author);
            if (file) {
                formdata.append("image", file);
            }
        await updateblog( blog._id ,formdata);
        router.push('/blogs');
    };

    const HandleDelete = async() => {
        await deleteblog(blog._id);
        router.push('/blogs');
    }

    const date = new Date(blog!.createdAt); 

    return (
        <div className="pr-8 pl-8 pt-8 overflow-hidden rounded-lg border border-purple-500 border-none min-h-screen">
            <img
                src={blog?.file}
                alt={blog?.title}
                className="w-full h-75 object-cover rounded-t-lg"
            />  
            <h1 className="text-3xl font-bold text-gray-300 mb-4 text-center p-2">{blog?.title.toLocaleUpperCase()}</h1>
            <Separator className='mb-5'/>
            <p className="text-gray-400 mb-6 px-2">{blog?.content}</p>
            <div className="text-sm text-gray-500 flex justify-between">
                <span>By {blog?.author.username}</span>
                <span>{date.toLocaleDateString()}</span>
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
                        value={blog?.author.username}
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
                    name="image"
                    type="file"
                    onChange={(e) => setfile(e.target.files?.[0])}
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
                onClick={HandleDelete}
                >
                Delete Blog
            </Button>
        </div>
    </div>
);
};

export default ShowBlogs;