'use client'

import { useState, useEffect } from 'react';
import { FieldValues } from 'react-hook-form';
import { Loading, AbsoluteLogo } from '../../../../components';
import { EmailNotification, ResetForm } from '../../../../components/users';
import { requestWrapper } from '../../../../lib/client';

export default function Page() {
    const [submitted, setSubmitted] = useState(false);
    const [success, setSuccess] = useState(false);
    const [email, setEmail] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const onSubmit = (data: FieldValues) => {
        if (submitted) return;

        setSubmitted(true);
        requestWrapper.post('/api/reset', data).then((res: Response) => {
            setSubmitted(false);
            if (res.status === 200) {
                setSuccess(true);
                setEmail(data.email);
            } else {
                res.json().then(data => {
                    setErrorMessage(data.message ?? "Unauthorized");
                })
            }
        }).catch(() => {});
    }

    return (<>
        <AbsoluteLogo />
        <div hidden={submitted} className="wrapper rounded-lg col-start-2 col-span-3 md:col-start-3 xl:col-start-4 xl:col-span-2 row-start-2 row-span-2 bg-white shadow-md shadow-gray-400 dark:shadow-neutral-900 dark:bg-neutral-850">
            {success ? <EmailNotification message="You will be able to finish resetting your password from there." title="Reset password" email={email} /> : <ResetForm onSubmit={onSubmit} errorMessage={errorMessage} />}
        </div>
        {submitted ? <div className="col-start-3 row-start-2 row-span-2 md:col-start-4 xl:col-start-4 xl:col-span-2"><Loading /></div> : ""}
    </>);
}