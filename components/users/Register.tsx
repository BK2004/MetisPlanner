'use client'

import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";

export default function Register() {
    const { register, handleSubmit } = useForm();
    const onSubmit = (data: FieldValues) => {
        fetch('/api/register', {
            method: 'POST',
            headers: {
                Accept: 'application/form-data',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(() => {

        }).catch(() => {

        })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register("username", { required: true })}></input>
            <input type="password" {...register("password", { required: true })}></input>
            <input type="submit"/>
        </form>
    );
}