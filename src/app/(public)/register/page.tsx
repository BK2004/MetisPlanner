'use client'

import { FieldValues } from "react-hook-form";
import { Register, Verify } from "../../../../components/users/";
import { useEffect, useState } from "react";

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
        {email === "" ? <Register onSubmit={onSubmit}/> : <Verify email={email} />}
    </>);
}