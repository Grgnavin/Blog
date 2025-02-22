"use server";
import dbConnect from "@/lib/connectDb";
import { generateToken } from "@/lib/generateToken";
import UserModel from "@/models/userModel";
import bcrypt from 'bcryptjs';
import { cookies } from "next/headers";

type SignupReturnType = {
    success?: boolean,
    error?: string,
    message?: string,
    data?: unknown
} | null;

export async function userSignup(formData: FormData): Promise<SignupReturnType> {
    await dbConnect();
    try {
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const username = formData.get("username") as string;
        console.log(email, password, username);
        
        if (!username || !email || !password) {
            return {
                success: false,
                error: "Credentials are required"
            }
        };

        let user =await UserModel.findOne({ email });

        if (user) {
            return {
                    success: false,
                    message: "User already exist with this email"
                };
        }

        const hashedPass = await bcrypt.hash(password, 10);
        
        user = await UserModel.create({
            username,
            email,
            password: hashedPass,
        })

        const token = await generateToken(user);
        const userWithoutPass = await UserModel.findById( user._id ).select("-password").lean();

        //set cookie
        (await cookies()).set("token", token, {
            httpOnly: true, // Prevents client-side access
            path: "/", // Make cookie available across the entire app
            maxAge: 60 * 60 * 24 * 7, // 1 week expiration
        });

        return {
            success: true,
            data: userWithoutPass,
            message: `Welcome to our Blogpage, ${user.username}`
        }

    } catch (error) {
        console.error("Error during sign-in:", error);
    return {
        success: false,
        message: "Something went wrong",
    };
}
}