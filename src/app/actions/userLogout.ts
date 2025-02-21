"use server";
import { cookies } from "next/headers";

export async function userLogout() {
    (await cookies()).set("token", "", {
        httpOnly: true,
        sameSite: "strict",
        expires: new Date(0)
    });

    return {
        success: true,
        message: "Logged out successfully"
    }
}