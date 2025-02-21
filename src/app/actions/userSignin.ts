"use server";
import dbConnect from "@/lib/connectDb";
import { generateToken } from "@/lib/generateToken";
import UserModel from "@/models/userModel";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function userSignin(prevstate: null, formData: FormData) {
    await dbConnect();
    try {
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        if (!email || !password) {
            return { success: false, error: "Credentials are required" };
        }

        let user = await UserModel.findOne({ email });

        if (!user) {
            return { success: false, error: "User not found" };
        }

        const checkPass = await bcrypt.compare(password, user.password!);
        if (!checkPass) {
            return { success: false, error: "Incorrect Password" };
        }

        const token = await generateToken(user);

        // Set cookie
        (await cookies()).set("token", token, {
            httpOnly: true,
            path: "/",
            maxAge: 60 * 60 * 24 * 7, // 1 week expiration
        });

        // Redirect and immediately stop execution
        
    } catch (error) {
        console.error("Error during sign-in:", error);
        return { success: false, error: "Something went wrong" };
    }
    redirect("/blogs");
}
