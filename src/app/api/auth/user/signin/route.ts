import bcrypt from 'bcryptjs';
import dbConnect from "@/lib/connectDb";
import UserModel from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { generateToken } from '@/app/lib/generateToken';

export async function POST(req: NextRequest): Promise<void> {
        //Login route
    try {
        const { email, password } = await req.json();

        await dbConnect();

        if (!email || !password) {
            NextResponse.json({
                message: "Credentials are required"
            }, { status: 401 });
            return;
        }

        let user = await UserModel.findOne({ email });

        if (!user) {
            NextResponse.json({
                success: false,
                message: "User not found"
            }, { status: 403 })
        }

        const isPasswordCorrect = bcrypt.compare(password, user?.password!);

        if (!isPasswordCorrect) {
            NextResponse.json({
                success: false,
                message: "Incorrect Password"
            }, { status: 403 })
        }

        generateToken(user);
        const userWithoutPass = await UserModel.findById(user?._id).select("-password");

        NextResponse.json({
            success: true,
            message: `Welcome back! ${user?.username}`,
            user: userWithoutPass
        }, { status: 200 });
    } catch (error) {
        console.log(error);
        NextResponse.json({
            message: "Internal Server Error"
        }, { status: 500 });
        return;
    }
}
