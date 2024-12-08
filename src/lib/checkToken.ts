'use server';
import { cookies } from "next/headers"

export const checkToken = async() => {
    if (typeof window !== "undefined") {
        return localStorage.getItem('token'); // Replace 'token' with your actual key
    }
    return null;
};
