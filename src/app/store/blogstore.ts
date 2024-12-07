import { toast } from "@/hooks/use-toast";
import axios from "axios";
import { create } from "zustand";
import { persist } from "zustand/middleware";

axios.defaults.withCredentials = true;

export interface Author {
    _id: string;
    username: string;
    email: string;
    password: string;  
    blogs: string[];   
    createdAt: string; 
    updatedAt: string;
}

export interface Blog {
    _id: string;
    title: string;
    content: string;
    author: Author;
    file: string;
    createdAt: string; 
    updatedAt: string; 
}

interface BlogStore {
    blog: null;
    singleBlog: Blog | null;
    allBlogs: Blog[] | [],
    loading: boolean;
    createBlog: (formData: FormData) => Promise<void>;
    updateBlog: (id: string, formData: FormData) => Promise<void>;
    deleteBlog: (id: string) => Promise<void>;
    getAllBlogs: () => Promise<void>;
    getSingleBlog: (id: string) => Promise<void>;
}

export const useBlogStore = create<BlogStore>()(
    persist(
        (set) => ({
            blog: null,
            singleBlog: null,
            loading: false,
            allBlogs: [],
            createBlog: async (formData: FormData) => {
                try {
                    set({ loading: true });
                    const res = await axios.post("/api/blog", formData, {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    });
                    if (res.data.success) {
                        set({ loading: false, blog: res.data.newPost });
                        toast({ 
                            description: res.data.message
                        })
                    } else {
                        set({ loading: false });
                        toast({
                            description: res.data.message || "Failed to create blog"
                        });
                    }
                } catch (error: any) {
                    console.log(error);
                set({ loading: false });
                toast({
                    variant: "destructive",
                    description: error.response?.data.message ||"Error while creating resturant" 
                });
                }
            },
            updateBlog: async (id: string, formData: FormData) => {
                try {
                    set({ loading: true });
                    const res = await axios.put(`/api/blog/${id}`, formData, {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    });
                    if (res.data.success) {
                        set({ loading: false });
                        toast({
                            description: res.data.message
                        })
                    } else {
                        set({ loading: false });
                        console.error(res.data.message || "Failed to update blog");
                    }
                } catch (error) {
                    console.error(error);
                    set({ loading: false });
                }
            },
            deleteBlog: async (id: string) => {
                try {
                    set({ loading: true });
                    const res = await axios.delete(`/api/blog/${id}`);
                    if (res.data.success) {
                        set({ loading: false, blog: null });
                        toast({
                            description: res.data.message
                        })
                    } else {
                        set({ loading: false });
                        console.error(res.data.message || "Failed to delete blog");
                    }
                } catch (error) {
                    console.error(error);
                    set({ loading: false });
                }
            },
            getAllBlogs : async() => {
                try {
                    set({ loading: true });
                    const res = await axios.get(`/api/blog`);
                    if (res.data.success) {
                        set({ loading: false, allBlogs: res.data.blogs });
                    } else {
                        set({ loading: false });
                        console.error(res.data.message || "Failed to delete blog");
                    }
                } catch (error) {
                    console.error(error);
                    set({ loading: false });
                }
            },
            getSingleBlog: async(id: string) => {
                try {
                    set({ loading: true });
                    const res = await axios.get(`/api/blog/${id}`);
                    if (res.data.success) {
                        set({ loading: false, singleBlog: res.data.blog });
                    } else {
                        set({ loading: false });
                        console.error(res.data.message || "Failed to update blog");
                    }
                } catch (error) {
                    console.error(error);
                    set({ loading: false });
                }
            }
        }),
        { name: "blog-store" }
    )
);