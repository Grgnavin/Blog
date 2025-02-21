"use server";
import dbConnect from "@/lib/connectDb";
import { BlogSchema } from "../schema/BlogSchema";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import uploadImageOnCloudinary from "@/lib/imageUpload";
import BlogModel from "@/models/blogModel";
import UserModel from "@/models/userModel";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

type CreateBlogReturnType = {
    error?: string,
    success?: boolean
} | null;

export async function createBlog(prevstate: any, formData: FormData): Promise<any> {
    await dbConnect();
    try {
        const res = BlogSchema.safeParse({
            title: formData.get('title'),
            description: formData.get('description'),
            author: formData.get('author'),
            image: formData.get('image'),
        });
        
        if (!res.success) {
            console.log(res.error.format());
            return {
                error: "Incomplete formdata"
            };
        }

        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;
        
        if (!token) {
            return { error: "No token found, please login" };
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
        
        const image = formData.get('image') as File || null;
        let imageUrl = null;
        if (image) {
            imageUrl = await uploadImageOnCloudinary(image);
        }
        const title = formData.get('title') as string;
        const description= formData.get('description') as string;
        const post = await BlogModel.create({
            title,
            content: description,
            author: decoded.userId,
            file: imageUrl
        });
        console.log("Post", post);
        if (!post) {
            return {
                error: "Error while creating post"
            }
        }
        
        const user = await UserModel.findById(decoded.userId);
        
        user?.blogs.push(post);
        await user?.save();
        console.log("Saved into Database");
        
        revalidatePath(`/blogs/${post.id}`);
        redirect(`/blogs/${post.id}`);
    } catch (error: unknown) {
        if (error instanceof Error) {
            return { error: error.message };
        }
        return { error: "An unknown error occurred" };
    }
}
