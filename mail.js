const nodemailer = require("nodemailer");
const config = require("./config");

const transporter = nodemailer.createTransport(config.EMAIL_CREDENTIALS);

async function sendContactEmail(name, email, message) {
    console.log('Preparing to send contact email from:', name, email, ' to :', config.EMAIL_TARGET);
    const info = await transporter.sendMail({
        from: '"Prowser API" <noreply@prowser.nl>',
        cc: email,
        to: config.EMAIL_TARGET,
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