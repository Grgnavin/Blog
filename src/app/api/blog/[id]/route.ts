import uploadImageOnCloudinary from "@/app/lib/imageUpload";
import dbConnect from "@/lib/connectDb";
import BlogModel from "@/models/blogModel";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import UserModel from "@/models/userModel";

export async function DELETE(req: NextRequest): Promise<NextResponse> {
    const id = req.nextUrl.pathname.split('/').pop();
    console.log(req.nextUrl.pathname);
    await dbConnect();
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value; // Extract the token value

        if (!token) {
            return NextResponse.json({ message: "No token found, please login" }, { status: 401 });
        }
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
        
        const user = await UserModel.findById(decoded.userId);
        const blog = await BlogModel.findById(id);

        if (user?._id!.toString() === blog?.author.toString()) {
            await BlogModel.findByIdAndDelete(id);
            return NextResponse.json({
                message: "Post has been deleted successfully",
                success: true
            }, { status: 200 });
        }


        return NextResponse.json({
            success: false,
            message: "Error while deleting the post"
        }, { status: 401 });

    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: "Internal server error",
            success: false
        }, { status: 500 });
    }
};

export async function PUT(req: NextRequest): Promise<NextResponse> {
    const id = req.nextUrl.pathname.split('/').pop();

    const formData = await req.formData();
    const title = formData.get("title")?.toString();
    const content = formData.get("content")?.toString();
    const file = formData.get("file");

    try {
        const post = await BlogModel.findById(id);

        if (!post) {
            return NextResponse.json({
                success: false,
                message: "Post not found"
            }, { status: 400 });
        }

        if (!(file instanceof File)) {
            return NextResponse.json({ message: "File is required" }, { status: 400 });
        }

        // Upload the file to Cloudinary
        const multerFile = file as unknown as Express.Multer.File;
        const imageUrl = await uploadImageOnCloudinary(multerFile);

        post.title = title || post.title;
        post.content = content || post.content;
        post.file = imageUrl.toString();
        await post.save();

        return NextResponse.json({
            success: true,
            message: "The file has been updated"
        }, { status: 201 });

    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: "Internal server error",
            success: false
        }, { status: 500 });
    }
}


export async function GET(req: NextRequest): Promise<NextResponse> {
    await dbConnect();
    console.log(req.nextUrl.pathname);
    const id = req.nextUrl.pathname.split('/').pop();

    try {
        const blog = await BlogModel.findById(id);
        if (!blog) {
            return NextResponse.json({
                message: "Blog not found",
                sucess: false
            }, { status: 401 });
        }

        return NextResponse.json({
            blog,
            success: true,
        }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: "Internal server error",
            success: false
        }, { status: 500 });
    }

}