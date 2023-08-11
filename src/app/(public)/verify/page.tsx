'use client'

import { useSearchParams } from "next/navigation"

export default function page() {
    const searchParams = useSearchParams();

    return (
        <div className="grid grid-cols-5 lg:grid-cols-6 grid-rows-5 gap-4 container w-screen h-screen max-w-full">
            <div className="rounded-lg border-2 border-gray-300 dark:border-slate-900 items-center px-6 py-6 row-start-2 row-span-3 col-start-2 col-span-3 lg:col-start-3 lg:col-span-2 flex justify-evenly flex-col bg-white dark:bg-slate-700">
                <div>
                    <h1 className="text-center mb-5 font-bold text-slate-800 dark:text-white text-2xl">Please verify your email.</h1>
                    <p className="text-center text-slate-700 dark:text-white">We sent an email to <span className="font-semibold text-slate-800 dark:text-white">{searchParams.get("email")}</span>. Click the link in the next 15 minutes to complete your registration!</p>
                </div>
                <p className="text-center text-slate-700 dark:text-white">If you don't see it, <span className="font-bold">check your spam.</span></p>
            </div>
        </div>
    )
}