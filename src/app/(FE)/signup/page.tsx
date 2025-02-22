"use client";
import React, { useState } from 'react'
import { Loader2, LockKeyhole, Mail, User } from "lucide-react";
import { Separator } from '@/components/ui/separator';
import { SignupInput, userSignupSchema } from '@/app/schema/userSchema';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useUserStore } from '@/app/store/userStore';
import { useRouter } from 'next/navigation';

const Signup: React.FC = () => {
    const[errors, setErrors] = useState<Partial<SignupInput>>({});
    const[loading, setLoading] = useState<boolean>(false);
    const { signup } = useUserStore();
    const router = useRouter();
    const handleSubmit =async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formdata = new FormData(e.currentTarget);
        setLoading(true);
        try {
            const res = await signup(formdata);
            router.push("/blogs");
        } catch (error) {
            console.error(error);
        }finally{
            setLoading(false)
        }
    }

    return (
        <div className='flex items-center justify-center min-h-screen'>
            <form onSubmit={handleSubmit} className='p-8 w-full max-w-md border mx-4 border-gray rounded-lg'>
                <div className='mb-4'>
                    <h1 className='font-bold text-2xl text-center text-white'>Builders Academy</h1>
                </div>
                <div className='mb-4'>
                <div className='relative'>
                <Input
                    type='text'
                    name='username'
                    placeholder='Full Name'
                    className='pl-10 focus-visible:ring-1 text-white'
                />
                <User className='absolute inset-y-2 left-2 text-gray-500 pointer-events-none'/>
                {
                    errors && <span className='text-sm text-red-500'>{errors.fullname}</span>
                }
                </div>
                </div>

                <div className='mb-4'>
                <div className='relative'>
                    <Input 
                        type='email'
                        name='email'
                        placeholder='Email'
                        className='pl-10 focus-visible:ring-1 text-gray-200'
                    />
                    <Mail className='absolute inset-y-2 left-2 text-gray-500 pointer-events-none'/>
                    {
                        errors && <span className='text-sm text-red-500'>{errors.email}</span>
                    }
                </div>
                </div>
                <div className='mb-4'>
                <div className='relative'>
                    <Input 
                        type='password'
                        name='password'
                        placeholder=' Password'
                        className='pl-10 focus-visible:ring-1 text-gray-200'
                    />
                    <LockKeyhole className='absolute inset-y-2 left-2 text-gray-500 pointer-events-none'/>
                    {
                        errors && <span className='text-sm text-red-500'>{errors.password}</span>
                    }
                </div>
                </div>
                <div className='mb-10'>
                    {
                        loading ? 
                            <Button disabled className='w-full bg-orange hover:bg-hoverOrange'><Loader2 className='mr-2 h-4 w-4 animate-spin'/> Please wait</Button> 
                            : <Button type='submit' className='w-full border border-gray-200'>Signup</Button>
                    }
                            {/* : <Button type='submit' className='w-full border border-gray-200'>Signup</Button> */}
                </div>
                <Separator />
                <p className='mt-2 text-center text-gray-300'>
                    Already have an account?{" "}
                    <Link href={"/login"} className='text-white font-semibold'>Login</Link>
                </p>
            </form>
        </div>
    )
}

export default Signup