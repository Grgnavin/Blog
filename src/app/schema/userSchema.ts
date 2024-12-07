import {z} from "zod";

export const userSignupSchema = z.object({
    fullname: z.string().min(1, "Full name is required").max(50, "Fullname can't be more than 50 letters"),
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be atleast 6 characters"),
});

export const userLoginSchema = z.object({
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be atleast 6 characters"),
});


export type SignupInput = z.infer<typeof userSignupSchema>
export type LoginInput = z.infer<typeof userLoginSchema>