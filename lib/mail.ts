const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.NODEMAIL_USER,
        pass: process.env.NODEMAIL_PASSWORD,
    }
})

export type Email = { recipient: string, content: string, subject: string }

export const sendEmail = async ({ recipient, content, subject }: Email) => {
    const res = await transport.sendMail({
        from: process.env.NODEMAIL_ALIAS,
        to: recipient,
        subject,
        html: content
    });

    return res;
}