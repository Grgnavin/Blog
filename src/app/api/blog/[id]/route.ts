import uploadImageOnCloudinary from "@/app/lib/imageUpload";
import dbConnect from "@/lib/connectDb";
import BlogModel from "@/models/blogModel";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest): Promise<NextResponse> {
    const id = req.nextUrl.pathname.split('/').pop();
    console.log(req.nextUrl.pathname);
    await dbConnect();
    try {
        const deleteBlog = await BlogModel.findByIdAndDelete(id);

        if (!deleteBlog) {
            return NextResponse.json({
                success: false,
                message: "Error while deleting the post"
            }, { status: 400 });
        };

        return NextResponse.json({
            success: true,
            message: "Post has been deleted successfully"
        }, { status: 200 });
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
        const multerFile = file as unknown as Express.Multer.File; // This may need more validation
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
