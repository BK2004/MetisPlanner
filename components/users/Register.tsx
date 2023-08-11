'use client'

import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { FieldValues, useForm } from "react-hook-form";

export default function Register() {
    const { register, handleSubmit } = useForm();
    const [created, setCreated] = useState(false);

    const onSubmit = (data: FieldValues) => {
        fetch('/api/register', {
            method: 'POST',
            headers: {
                Accept: 'application/form-data',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then((res: Response) => {
            setCreated(true);
        }).catch(() => {
        })
    }

    useEffect(() => {
        if (created) {
            // Redirect to verification page
            redirect('/verify');
        }
    })

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register("email", { required: true })}></input>
            <input type="password" {...register("password", { required: true })}></input>
            <input type="submit"/>
        </form>
    );
}