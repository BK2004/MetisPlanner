import { NextRequest, NextResponse } from 'next/server';
import { prisma, sendEmail } from '../../../../helpers';
import { emailTemplates } from '../../../../components';
import { userManagement } from '../../../../helpers/api';

export async function POST(req: NextRequest) {
    const data = await req.json();
    try {
        if (!data.email) throw 'Invalid arguments.';

        const res = await userManagement.requestPasswordChange(data.email);

        if (!res) throw 'Failed to create reset link (Internal server error)';
        const url = req.nextUrl.clone();
        url.pathname = `/reset/${res.id}`;

        // Send verification email
        await sendEmail({
            recipient: res.email,
            content: emailTemplates.reset({resetUrl: decodeURIComponent(url.href)}),
            subject: "Reset password"
        })

        return NextResponse.json({status: 200});
    } catch(e: any) {
        return NextResponse.json({message: e}, {status: 401, statusText: e});
    }
}