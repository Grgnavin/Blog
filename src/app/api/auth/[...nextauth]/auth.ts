import CredentialsProvider  from 'next-auth/providers/credentials';
import dbConnect from "@/lib/connectDb";
import UserModel from '@/models/userModel';
import bcrypt from "bcryptjs";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "username", type: "text", placeholder: "Enter your username", required: true },
                phone: { label: "email", type: "text", placeholder: "Enter your email", required: true },
                password: { label: "Password", type: "password", required: true }
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
                    const passwordValidation = await bcrypt.compare(credentials.password, user.password) 
                    if (passwordValidation) {
                        return {
                            user
                        };
                    }
                    return null;
                }
                try {
                    const hashedPass = await bcrypt.hash(credentials.password, 10);
                    const newUser = await UserModel.create({
                        email: credentials.email,
                        username: credentials.username,
                        password: hashedPass,
                    });
                    
                    const user = await UserModel.findById(newUser._id).select("-password");
                    return user;
                } catch (error) {
                    console.log(error);
                }
                return null;
            }
        })
    ], 
    secret: process.env.JWT_SECRET || "secret",
    callbacks: {
        async session({ token, session }: any) {
            session.user.id = token.sub
            return session;
        }
    }
}