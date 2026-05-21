import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === true,
    requireTLS: process.env.SMTP_REQUIRE_TLS === true
} as SMTPTransport.Options);

type SendMailTo = {
    sender: Mail.Address;
    receipients: Mail.Address[];
    subject: string;
    message: string;
}
export const sendMail = async (properties: SendMailTo) => {
    const { sender, receipients, subject, message } = properties;

    return await transport.sendMail({
        from: sender,
        to: receipients,
        subject,
        html: message,
        text: message
    })
}