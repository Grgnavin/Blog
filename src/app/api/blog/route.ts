import jwt from 'jsonwebtoken';
import dbConnect from "@/lib/connectDb";
import { NextRequest, NextResponse } from "next/server";
import BlogModel from "@/models/blogModel";
import { cookies } from "next/headers";
import uploadImageOnCloudinary from '@/app/lib/imageUpload';

export async function GET(req: NextRequest,) {
    await dbConnect();
    try {
        const blogs = await BlogModel.find();
        if (!blogs || blogs.length < 0) {
            return NextResponse.json({
                message: "No blogs to show",
                success: true
            }, { status: 201 });
        }
        return NextResponse.json({
            blogs,
            success: true
        }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: "Internal server error",
            success: false
        }, { status: 500 });
    }
};
export async function POST(req: NextRequest, res: NextResponse): Promise<NextResponse> {
    await dbConnect();

    const formData = await req.formData();
    const title = formData.get("title")?.toString();
    const description = formData.get("description")?.toString();
    const author = formData.get("author")?.toString();
    const file = formData.get("file");

    if (!title || !description || !author || !file) {
        return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value; // Extract the token value

        if (!token) {
            return NextResponse.json({ message: "No token found, please login" }, { status: 401 });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };

        // Check if file is a valid instance of File
        if (!(file instanceof File)) {
            return NextResponse.json({ message: "File is required" }, { status: 400 });
        }
        // Upload the file to Cloudinary
        const multerFile = file as unknown as Express.Multer.File;
        const imageUrl = await uploadImageOnCloudinary(multerFile);

        const newPost = await BlogModel.create({
            title,
            description,
            author: decoded.userId, // Use the userId from the token as the author
            file: imageUrl, // Save the Cloudinary image URL in your database
        });

        return NextResponse.json({
            success: true,
            message: "Post created successfully",
            post: newPost,
        }, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

