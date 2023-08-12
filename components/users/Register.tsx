'use client'

import { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";

export const Register = ({ onSubmit }: { onSubmit: (data: FieldValues) => any }) => {
    const { register, handleSubmit } = useForm();

    return (
        <div className="grid grid-cols-5 md:grid-cols-7 xl:grid-cols-8 grid-rows-4 gap-4 container w-screen h-screen max-w-full">
            <div className="form-wrapper rounded-lg col-start-2 col-span-3 md:col-start-3 xl:col-start-4 xl:col-span-2 row-start-2 row-span-2 bg-white shadow-md shadow-gray-400 dark:shadow-slate-900 dark:bg-slate-700">
                <form className="flex flex-col justify-between h-full px-6 py-12" onSubmit={handleSubmit(onSubmit)}>
                    <div className="input-wrapper w-fill text-slate-700 dark:text-white">
                        <div className="input-col my-3">
                            <label htmlFor="email">Email</label>
                            <input id="email" className="border-gray-500 border-[1px] rounded-md px-3 py-1 w-full" type="text" {...register("email", { required: true, pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ })}></input>
                        </div>
                        <div className="input-col my-3">
                            <label htmlFor="password">Password</label>
                            <input id="password" className="border-gray-500 border-[1px] rounded-md px-3 py-1 w-full" type="password" {...register("password", { required: true })}></input>
                        </div>
                    </div>
                    <input className="w-fit text-2xl rounded-xl shadow-md shadow-gray-400 dark:shadow-slate-800 p-3 px-5 text-white bg-blue-700" type="submit" value="SIGN UP"/>
                </form>
            </div>
        </div>
    );
}