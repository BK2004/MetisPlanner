'use client'

import { FieldValues, useForm } from "react-hook-form";
import { AuthError } from ".";

export const AuthForm = ({ onSubmit, authType, errorMessage="" }: { onSubmit: (data: FieldValues) => any, authType: "register" | "login", errorMessage: string }) => {
    const { register, handleSubmit } = useForm();

    return (
        <form className="flex flex-col justify-between h-full px-6 py-6 dark:text-neutral-400 text-neutral-600" onSubmit={handleSubmit(onSubmit)}>
            <div className="top-wrap w-full">
                <h1 className="logo text-2xl mb-3 text-blue-600 font-extrabold text-center">
                    {authType === "register" ? "Create an account" : "Sign in to Account"}
                </h1>
                <div className="input-col mb-4">
                    <label htmlFor="email" className="">Email</label>
                    <input id="email" className="outline-0 dark:bg-neutral-750 ring-gray-400 dark:ring-neutral-900 ring-1 focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500 ring-inset border-0 rounded-md px-3 py-2 w-full transition-all duration-100 ease-linear" type="text" {...register("email", { required: true, pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ })}></input>
                </div>
                <div className="input-col my-4">
                    <label htmlFor="password" className="">Password</label>
                    <input id="password" className="outline-0 dark:bg-neutral-750 ring-gray-400 dark:ring-neutral-900 ring-1 focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500 ring-inset border-0 rounded-md px-3 py-2 w-full transition-all duration-100 ease-linear" type="password" {...register("password", { required: true })}></input>
                    {authType === "login" ? <a href="/reset" className="text-blue-600 dark:text-blue-500 text-sm hover:underline">Forgot your password?</a> : ""}
                </div>
            </div>
            <div>
                { errorMessage !== "" ? <AuthError errorMessage={errorMessage} /> : ""}
                <input className="bot-wrap w-full text-2xl rounded-xl p-3 px-5 text-white bg-blue-600 hover:cursor-pointer hover:opacity-90 transition-all duration-150" type="submit" value={authType === "register" ? "SIGN UP" : "SIGN IN"}/>
                <a href={`/${authType === "register" ? "login" : "register"}`} className="block mt-3 text-blue-600 dark:text-blue-500 text-sm hover:underline">
                    {authType === "register" ? "Already have an account?" : "Don't have an account?"}
                </a>
            </div>
        </form>
    );
}