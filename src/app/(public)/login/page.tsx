'use client'

import { FieldValues } from "react-hook-form";
import { AuthForm } from "../../../../components/users";
import { useState, useEffect } from "react";
import { AbsoluteLogo, Loading } from "../../../../components";
import { redirect } from "next/navigation";

export default function page() {
    const [submitted, setSubmitted] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (success) {
            redirect("planner/daily");
        }
    })

    const onSubmit = (data: FieldValues) => {
        if (submitted) {
            return;
        }

        setSubmitted(true);
        fetch('/api/login', {
            method: 'POST',
            headers: {
                Accept: 'application/form-data',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then((res: Response) => {
            setSubmitted(false);
            if (res.status == 200) {
                setSuccess(true);
            }
        }).catch((e) => {})
    }
    return (<>
        <AbsoluteLogo />
        <div hidden={submitted} className="text-slate-700 dark:text-gray-400 wrapper rounded-lg col-start-2 col-span-3 md:col-start-3 xl:col-start-4 xl:col-span-2 row-start-2 row-span-2 bg-white shadow-md shadow-gray-400 dark:shadow-neutral-900 dark:bg-neutral-800">
            <AuthForm onSubmit={onSubmit} authType="login" />
        </div>
        {submitted ? <div className="col-start-3 row-start-2 row-span-2 md:col-start-4 xl:col-start-4 xl:col-span-2"><Loading /></div> : ""}
    </>)
}