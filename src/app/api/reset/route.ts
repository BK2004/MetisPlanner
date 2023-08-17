import { NextRequest, NextResponse } from 'next/server';
import { prisma, sendEmail } from '../../../../helpers';
import { emailTemplates } from '../../../../components';

export async function POST(req: NextRequest) {
    const data = await req.json();
    try {
        if (!data.email) throw 'Invalid arguments.';

        if (!(await prisma.users.findUnique({ where: { email: data.email }}))) throw 'Invalid email';

        if ((await prisma.passwordChanges.findUnique({ where: {
            email: data.email
        }}))) {
            // Overwrite existing entry
            await prisma.passwordChanges.delete({ where: { email: data.email }});
        }
        const res = await prisma.passwordChanges.create({data: {
            email: data.email
        }});

        if (!res) throw 'Failed to create reset link (Internal server error)';
        const url = req.nextUrl.clone();
        url.pathname = `/api/reset?id=${res.id}`;

        // Send verification email
        await sendEmail({
            recipient: res.email,
            content: emailTemplates.reset({resetUrl: decodeURIComponent(url.href)}),
            subject: "Reset password"
        })

        return NextResponse.json({status: 200});
    } catch(e) {
        return NextResponse.json({message: e}, {status: 401})
    }
}