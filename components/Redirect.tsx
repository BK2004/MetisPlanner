'use client'

import { useEffect } from 'react';
import { redirect } from 'next/navigation';

export function Redirect({ redirectUrl }: { redirectUrl: string}) {
    useEffect(() => {
        redirect(redirectUrl);
    })

    return (
        <></>
    )
}