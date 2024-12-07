import CredentialsProvider from 'next-auth/providers/credentials';
import dbConnect from "@/lib/connectDb";
import UserModel from '@/models/userModel';
import bcrypt from "bcryptjs";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "Enter your email", required: true },
                password: { label: "Password", type: "password", required: true, placeholder: "Enter your password" }
            },
            async authorize(credentials: any): Promise<any> {
                if (!credentials) {
                    return null;
                }
                await dbConnect();
                const user = await UserModel.findOne({
                    email: credentials.email
                }).select("-password");
                if (user) {
                    const passwordValidation = await bcrypt.compare(credentials.password, user.password);
                    if (passwordValidation) {
                        return user; // Valid user
                    }
                    return null; // Invalid password
                }
                try {
                    const hashedPass = await bcrypt.hash(credentials.password, 10);
                    const newUser = await UserModel.create({
                        email: credentials.email,
                        username: credentials.username,
                        password: hashedPass,
                    });
                    const createdUser = await UserModel.findById(newUser._id).select("-password -image");
                    return createdUser;
                } catch (error) {
                    console.log("Error creating user:", error);
                    return null;
                }
            }
        })
    ],
    secret: process.env.JWT_SECRET || "secret",
    callbacks: {
        async session({ token, session }: any) {
            if (token?.sub) {
                session.user.id = token.sub;
            }
            return session;
        }
    }
}
