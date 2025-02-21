import React, { useActionState } from 'react'
import { Button } from './ui/button';
import { DialogTrigger } from '@radix-ui/react-dialog';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Separator } from './ui/separator';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Loader2 } from 'lucide-react';
import { BlogFormSchema } from './BlogPage';
import { createBlog } from '@/app/actions/createBlog';

const AddBlog = ({loading, error}: {loading: boolean, error: Partial<BlogFormSchema> | undefined}) => {
    const[state, action, isLoading] = useActionState(createBlog, null);
    return (
        <div>
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
                    <form action={action} className="space-y-4">
                    <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-300">
                                Title
                            </label>
                    <Input
                        id="title"
                        name="title"
                        // onChange={handleInputChange}
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
                        // onChange={(e) => setfile(e.target.files?.[0])}
                        className="mt-1 block w-full text-gray-300"
                    />
                </div>
                    <Button
                        type='submit'
                        className="mt-4 px-6 py-2 text-white border border-gray-300 rounded-lg shadow w-full"
                        disabled={loading} // Disable button while loading
                    >
                        {isLoading ? (
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
    )
}

export default AddBlog