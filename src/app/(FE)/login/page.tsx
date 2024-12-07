"use client";
import React, { useState } from 'react'
import { Loader2, LockKeyhole, Mail, User } from "lucide-react";
import { Separator } from '@/components/ui/separator';
import { SignupInput, userSignupSchema } from '@/app/schema/userSchema';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';


const Login: React.FC = () => {
    const[input, setInput] = useState<SignupInput>({
        email: "",
        password: "",
        fullname: "",
    });
    const[errors, setErrors] = useState<Partial<SignupInput>>({});
    const changeEventHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInput({...input, [name]: value});
    };
    const loginSubmitHandler = async(e: React.FormEvent) => {
        e.preventDefault();
        const res = userSignupSchema.safeParse(input);
        if (!res.success) {
            const fieldError = res.error.formErrors.fieldErrors;
            setErrors(fieldError as Partial<SignupInput>);
            return;
        }
        //api implement
        console.log(input);
        

        setInput({
            email: "",
            fullname: "",
            password: ""
        })
    }

    const loading = false;

    return (
        <div className='flex items-center justify-center min-h-screen'>
            <form onSubmit={loginSubmitHandler} className='p-8 w-full max-w-md border mx-4 border-gray rounded-lg'>
                <div className='mb-4'>
                    <h1 className='font-bold text-2xl text-center text-white'>Builders Academy</h1>
                </div>
                <div className='mb-4'>
                <div className='relative'>
                <Input
                    type='text'
                    name='fullname'
                    placeholder='Full Name'
                    className='pl-10'
                    value={input.fullname}
                    onChange={changeEventHandler}
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
                        className='pl-10 focus-visible:ring-1'
                        value={input.email}
                        onChange={changeEventHandler}
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
                        className='pl-10 focus-visible:ring-1'
                        value={input.password}
                        onChange={changeEventHandler}
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
                            <Button disabled className='w-full'><Loader2 className='mr-2 h-4 w-4 animate-spin'/> Please wait</Button> 
                            : <Button type='submit' className='w-full border border-gray-200'>Login</Button>
                    }
                </div>
                <Separator />
                <p className='mt-2 text-center text-gray-300'>
                    Don't have an account?{" "}
                    <Link href={'/signup'}  className='text-white font-semibold'>Signup</Link>
                </p>
            </form>
        </div>
    )
}

export default Login