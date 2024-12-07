import jwt from 'jsonwebtoken';
import dbConnect from "@/lib/connectDb";
import { NextRequest, NextResponse } from "next/server";
import BlogModel from "@/models/blogModel";
import { cookies } from "next/headers";
import uploadImageOnCloudinary from '@/lib/imageUpload';
import UserModel from '@/models/userModel';

export async function GET(req: NextRequest,) {
    await dbConnect();
    try {
        const blogs = await BlogModel.find().populate('author');
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

    try {
        const formData = await req.formData();
        const title = formData.get("title")?.toString();
        const description = formData.get("description")?.toString();
        const author = formData.get("author")?.toString();
        const image = formData.get("image"); 
        if (!title || !description || !author || !image) {
            return NextResponse.json({ message: "All fields are required" }, { status: 400 });
        }

        if (!(image instanceof File)) {
            return NextResponse.json({ message: "Image must be a valid file" }, { status: 400 });
        }

        const imageBuffer = Buffer.from(await image.arrayBuffer());

        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;

        if (!token) {
            return NextResponse.json({ message: "No token found, please login" }, { status: 401 });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };

        const imageUrl = await uploadImageOnCloudinary(image);

        const newPost = await BlogModel.create({
            title,
            content: description,
            author: decoded.userId, 
            file: imageUrl, 
        });

        const user = await UserModel.findById(decoded.userId);
        user?.blogs.push(newPost);
        await user?.save();

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

