import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export const generateToken = async (user: any) => {
    const cookieStore = await cookies()
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, { expiresIn: '1d' });
    cookieStore.set('token', token, { httpOnly: true, sameSite: "strict", maxAge: 24*60*60*1000 });
    return token;
}