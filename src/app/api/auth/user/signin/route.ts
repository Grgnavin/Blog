import bcrypt from 'bcryptjs';
import dbConnect from "@/lib/connectDb";
import UserModel from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { generateToken } from '@/lib/generateToken';

export async function POST(req: NextRequest): Promise<NextResponse> {
    try {
        const { email, password } = await req.json();

        await dbConnect();

        if (!email || !password) {
            return NextResponse.json({
                message: "Credentials are required"
            }, { status: 401 });
        }

        let user = await UserModel.findOne({ email });

        if (!user) {
            return NextResponse.json({
                success: false,
                message: "User not found"
            }, { status: 403 });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user?.password!);

        if (!isPasswordCorrect) {
            return NextResponse.json({
                success: false,
                message: "Incorrect Password"
            }, { status: 403 });
        }

        const token = await generateToken(user);

        // Set cookie in the response
        const response = NextResponse.json({
            success: true,
            message: `Welcome back! ${user.username}`,
            user: {
                id: user._id,
                email: user.email,
                username: user.username,
            },
        }, { status: 200 });

        response.cookies.set("token", token, {
            httpOnly: true,
            sameSite: "strict",
            maxAge: 24 * 60 * 60,
        });

        return response;
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            message: "Internal Server Error"
        }, { status: 500 });
    }
}

