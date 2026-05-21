import { sendMail } from '@/utils/mail.utils';
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    const body = await request.formData();
    if (!body.has("email") || !body.has("first-name") || !body.has("last-name") || !body.has("message")) {
        return NextResponse.redirect(
            new URL("/contact?error=Invalid request", request.url)
        );
    }

    const email = body.get("email");
    const firstName = body.get("first-name");
    const lastName = body.get("last-name");
    const message = body.get("message");
    const fullName = `${firstName} ${lastName}`;
    const ownerEmail = process.env.NEXT_PUBLIC_EMAIL;

    if (!ownerEmail) {
        throw new Error("NEXT_PUBLIC_EMAIL is not defined");
    }

    const sender = {
        name: "Prowser contact form",
        address: "noreply@prowser.nl"
    }
    const receipients = [
        {
            name: "Owner",
            address: ownerEmail
        }
    ]

    try {
        await sendMail({
        sender,
        receipients,
        subject: "Nieuw contact bericht van " + fullName,
        message: `<h1>Nieuw contact bericht</h1><br><br>Naam: ${fullName} (${firstName}) (${lastName})<br>Email: ${email}<br>Bericht:<br>${message}`
    });
    } catch (error) {
        console.log("ERROR SENDING MAIL:", error);
        return NextResponse.redirect(
            new URL(`/contact?error=Een fout tijdens het sturen van de mail is opgetreden.`, request.url)
        );
    }

    return NextResponse.redirect(
        new URL("/contact?success=true", request.url)
    );
}