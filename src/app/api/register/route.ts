import { userManagement } from "../../../../helpers/api";
import { NextResponse, NextRequest } from "next/server";
import { sendEmail } from "../../../../helpers";
import { emailTemplates } from "../../../../components";

export async function POST(req: NextRequest) {
    const data = await req.json();
    try {
        const res = await userManagement.registerUser(data);

        const url = req.nextUrl.clone();
        url.pathname = `/api/verify?id=${res.id}`;

        // Send verification email
        await sendEmail({
            recipient: res.username,
            content: emailTemplates.verification({verificationUrl: decodeURIComponent(url.href)}),
            subject: "Account verification"
        })

        return NextResponse.json({"message": "success"});
    } catch (e) {
        console.log(e);
        return NextResponse.json({"message": "Email already in use, please sign in."}, {"status": 401});
    }
}