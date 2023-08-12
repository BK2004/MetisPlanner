'use client'

import { FieldValues } from "react-hook-form";
import { Register, Verify } from "../../../../components/users/";
import { useEffect, useState } from "react";

export default function page() {
    const [email, setEmail] = useState("");
    
    const onSubmit = (data: FieldValues) => {
        fetch('/api/register', {
            method: 'POST',
            headers: {
                Accept: 'application/form-data',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then((res: Response) => {
            setEmail(data.email);
        }).catch(() => {
        })
    }

    return (<>
        {email === "" ? <Register onSubmit={onSubmit}/> : <Verify email={email} />}
    </>);
}