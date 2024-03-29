'use client'

import { FieldValues } from "react-hook-form";
import { AuthForm, EmailNotification } from "../../../../components/users/";
import { useState } from "react";
import { Loading } from "../../../../components";
import { requestWrapper } from "../../../../lib/client";

export default function Page() {
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    
    const onSubmit = (data: FieldValues) => {
        if (submitted) {
            return;
        }

        setSubmitted(true);
        requestWrapper.post('/api/register', data).then((res: Response) => {
            setSubmitted(false);
            if (res.status != 200) {
                res.json().then(data => {
                    setErrorMessage(data.message ?? "Unauthorized");
                });

                return; 
            }
            setEmail(data.email);
        }).catch((e) => {
            
        })
    }

    return (<>
        <div hidden={submitted} className="wrapper rounded-lg col-start-2 col-span-3 md:col-start-3 xl:col-start-4 xl:col-span-2 row-start-2 row-span-2 bg-white shadow-md shadow-gray-400 dark:shadow-neutral-900 dark:bg-neutral-850">
            {email === "" ? <AuthForm onSubmit={onSubmit} authType="register" errorMessage={errorMessage} /> : <EmailNotification message="Click the link in the next 15 minutes to complete your registration!" title="Please verify your email." email={email} />}
        </div>
        {submitted ? <div className="col-start-3 row-start-2 row-span-2 md:col-start-4 xl:col-start-4 xl:col-span-2"><Loading /></div> : ""}
    </>);
}