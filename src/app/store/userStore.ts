import axios from "axios";
import { create } from "zustand";
import { LoginInput, SignupInput } from "../schema/userSchema";
import { persist } from "zustand/middleware";
import { toast } from "@/hooks/use-toast";


axios.defaults.withCredentials = true;

interface User {
    username: string;
    email: string;
}

interface UserStore {
    user: User | null;
    loading: boolean;
    signup: (input: SignupInput) => Promise<void>;
    login: (input: LoginInput) => Promise<void>;
    logout: () => Promise<void>;
}

export const useUserStore = create<UserStore>()(
    persist((set) => ({
        user: null,
        loading: false,
        signup: async(input: SignupInput) => {
            try {
                set({ loading: true });
                const res = await axios.post('/api/auth/signup', input);
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
                const res = await axios.post('/api/auth/user/logout');
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
        }
    }), {
        name: "user-store"
    }
),
);


