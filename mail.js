const nodemailer = require("nodemailer");
const { getEmailCredentials, getEmailTarget } = require("./secret");
const emailCredentials = getEmailCredentials();
const emailTarget = getEmailTarget();

const transporter = nodemailer.createTransport(emailCredentials);

async function sendContactEmail(name, email, message) {
    const info = await transporter.sendMail({
        from: '"Prowser API" <noreply@prowser.nl>',
        cc: email,
        to: emailTarget,
        subject: "Contact formulier bericht van " + name,
        html: `
        <h2>Nieuw bericht van het contact formulier</h2>
        <p><strong>Naam:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Bericht:</strong><br/>${message}</p>
        `, // HTML body
    });

    return info.messageId;
}

module.exports = { sendContactEmail };