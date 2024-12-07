import jwt from "jsonwebtoken";

export const generateToken = async (user: any) => {
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, { expiresIn: '1d' });
    return token;
};
