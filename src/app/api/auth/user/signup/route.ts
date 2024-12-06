import bcrypt  from 'bcryptjs';
import UserModel from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { generateToken } from '@/app/lib/generateToken';
import dbConnect from '@/lib/connectDb';

export async function POST(req: NextRequest): Promise<void> {
    try {
        const {username, email, password } = await req.json();

        await dbConnect();

        if (!username.trim() || !email || !password) {
            NextResponse.json({
                message: "Credentials are required"
            }, { status: 401 });
            return;
        }

        let user =await UserModel.findOne({ email });

        if (user) {
            NextResponse.json({
                success: false,
                message: "User already exist with this email"
            });
            return;
        }

        const hashedPass = await bcrypt.hash(password, 10);

        user = await UserModel.create({
            username,
            email,
            password: hashedPass,
        })

        generateToken(user);
        const userWithoutPass = await UserModel.findById( user._id ).select("-password");

        NextResponse.json({
            success: true,
            message: "Account created Successfully",
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

