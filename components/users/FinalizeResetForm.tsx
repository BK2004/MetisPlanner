'use client'

import { FieldValues, useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { redirect } from "next/navigation";
import { Loading } from "..";
import { AuthError } from ".";

export function FinalizeResetForm({ email, resetId }: { email: string, resetId: string }) {
    const { register, handleSubmit } = useForm();
    const [submitted, setSubmitted] = useState(false);
    const [success, setSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        if (success) {
            redirect("/planner/daily");
        }
    })
    
    const onSubmit = (data: FieldValues) => {
        if (submitted) return;

        setSubmitted(true);
        fetch("/api/finishReset", {
            method: "POST",
            headers: {
                Accept: 'application/form-data',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Object.assign({ resetId }, data))
        }).then((res: Response) => {
            if (res.status === 200) {
                setSuccess(true);
            } else {
                setSubmitted(false);
                res.json().then(data => {
                    setErrorMessage(data.message !== undefined ? data.message : "Unauthorized");
                });
            }
        }).catch(() => {});
    }

    if (!submitted)
        return (<form className="bg-white shadow-md shadow-gray-400 dark:shadow-neutral-900 dark:bg-neutral-850 flex flex-col justify-between h-full px-6 py-6 dark:text-neutral-400 text-neutral-600" onSubmit={handleSubmit(onSubmit)}>
                    <div className="top-wrap w-full">
                        <h1 className="logo text-2xl mb-3 text-blue-600 font-extrabold text-center">
                            Reset your password.
                        </h1>
                        <div className="input-col mb-4">
                            <label htmlFor="email" className="">Email</label>
                            <input value={email} id="email" className="disabled outline-0 bg-gray-100 ring-gray-400 dark:bg-neutral-750 dark:ring-neutral-900 ring-1 ring-inset border-0 rounded-md px-3 py-2 w-full transition-all duration-100 ease-linear" type="text" {...register("email", { required: true, pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ })}></input>
                        </div>
                        <div className="input-col">
                            <label htmlFor="password" className="">Password</label>
                            <input id="password" type="password" className="outline-0 bg-gray-100 ring-gray-400 dark:bg-neutral-750 dark:ring-neutral-900 ring-1 focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500 ring-inset border-0 rounded-md px-3 py-2 w-full transition-all duration-100 ease-linear" {...register("password", { required: true })}></input>
                        </div>
                    </div>
                    <div>
                        {errorMessage !== "" ? <AuthError errorMessage={errorMessage}/> : ""}
                        <input className="bot-wrap w-full text-2xl rounded-xl p-3 px-5 text-white bg-blue-600 hover:cursor-pointer hover:opacity-90 transition-all duration-150" type="submit" value="RESET PASSWORD"/>
                    </div>
                </form>);
    else {
        return <Loading />;
    }
}