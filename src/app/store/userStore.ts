import axios from "axios";
import { create } from "zustand";
import { LoginInput, SignupInput } from "../schema/userSchema";
import { persist } from "zustand/middleware";
import { toast } from "@/hooks/use-toast";
import { userLogout } from "../actions/userLogout";
import { userSignup } from "../actions/userSignup";

axios.defaults.withCredentials = true;

type User = {
    username: string;
    email: string;
} | null | unknown;

interface UserStore {
    user: User | null;
    loading: boolean;
    signup: (formData: FormData) => Promise<void>;
    login: (input: LoginInput) => Promise<void>;
    logout: () => Promise<void>;
}

export const useUserStore = create<UserStore>()(
    persist((set) => ({
        user: null,
        loading: false,
        signup: async(formData: FormData) => {
            try {
                set({ loading: true });
                const res = await userSignup(formData);
                if (res?.success) {
                    set({ loading: false, user: res?.data });
                    toast({
                        description: res?.message
                    })
                }else{
                    set({ loading: false });
                    toast({
                        description: res?.message || "Signup failed for some reason",
                    });
                }
            } catch (error: any) {
                console.log(error);
                set({ loading: false });
                toast({
                    description: "Something went wrong during signup",
                });
            }
        },
        login: async(input: LoginInput) => {
            try {
                set({ loading: true });
                const res = await axios.post('/api/auth/user/signin', input);
                if (res.data.success) {
                    set({ loading: false, user: res.data.user });
                    toast({
                        description: res.data.message
                    })
                }else{
                    set({ loading: false });
                }
            } catch (error: any) {
                console.log(error);
                set({ loading: false });
            }
        },
        logout: async() => {
            try {
                set({ loading: true });
                const res = await userLogout();
                if (res.success) {
                    set({ user: undefined});
                    toast({
                        description: res.message
                    })
                }else{
                    set({ loading: false });
                }
            } catch (error: any) {
                console.log(error);
                set({ loading: false });
            }
        }
    }), {
        name: "user-store"
    }
),
);


