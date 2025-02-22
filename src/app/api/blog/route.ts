import dbConnect from "@/lib/connectDb";
import { NextRequest, NextResponse } from "next/server";
import BlogModel from "@/models/blogModel";

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
