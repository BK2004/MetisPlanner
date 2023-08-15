'use client'

import { FieldValues } from "react-hook-form";
import { AuthForm, Verify } from "../../../../components/users/";
import { useState } from "react";
import { AbsoluteLogo, Loading } from "../../../../components";

export default function page() {
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);
    
    const onSubmit = (data: FieldValues) => {
        if (submitted) {
            return;
        }

        setSubmitted(true);
        fetch('/api/register', {
            method: 'POST',
            headers: {
                Accept: 'application/form-data',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then((res: Response) => {
            setSubmitted(false);
            if (res.status != 200) { return; }
            setEmail(data.email);
        }).catch((e) => {
            
        })
    }

    return (<>
        <AbsoluteLogo />
        <div className="grid grid-cols-5 md:grid-cols-7 xl:grid-cols-8 grid-rows-4 gap-4 container w-screen h-screen max-w-full">
            <div aria-hidden={submitted} className="text-slate-700 dark:text-gray-400 wrapper rounded-lg col-start-2 col-span-3 md:col-start-3 xl:col-start-4 xl:col-span-2 row-start-2 row-span-2 bg-white shadow-md shadow-gray-400 dark:shadow-neutral-900 dark:bg-neutral-800">
                {email === "" ? <AuthForm onSubmit={onSubmit} authType="register" /> : <Verify email={email} />}
            </div>
            {submitted ? <div className="col-start-3 row-start-2 row-span-2 md:col-start-4 xl:col-start-4 xl:col-span-2"><Loading /></div> : ""}
        </div>
    </>);
}