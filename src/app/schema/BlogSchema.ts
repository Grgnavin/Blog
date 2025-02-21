import { z } from "zod";

export const BlogSchema = z.object({
    title: z.string().min(1, { message: "Title is required"}),
    description: z.string().min(5, { message: "Description is required"}),
    author: z.string().min(0, { message: "Price cannot be negative"}),
    image: z.instanceof(File).optional().refine((file) => file?.size !== 0, { message: "Image file is required" })
});