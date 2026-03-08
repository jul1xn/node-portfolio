const express = require('express');
const router = express.Router();
const constants = require('../constants');
const { sendContactEmail } = require('../mail');
const axios = require("axios")

router.get('/', async (req, res) => {
    return await res.render('general/index', { title: 'Home', links: constants.NAVBAR_LINKS, name: constants.WEBSITE_NAME, short: constants.SHORT_NAME });
});

router.get('/over-mij', async (req, res) => {
    return await res.render('general/overmij', { title: 'Over mij', links: constants.NAVBAR_LINKS, name: constants.WEBSITE_NAME, short: constants.SHORT_NAME });
});

router.route('/contact')
    .get(async (req, res) => {
        const sent = req.query.sent === 'true';
        return await res.render('general/contact', { error: req.query.error, site_key: constants.CLOUDFLARE_DATA.site_key, sent: sent, title: 'Contact', links: constants.NAVBAR_LINKS, name: constants.WEBSITE_NAME, short: constants.SHORT_NAME });
    })
    .post(async (req, res) => {
        let token = null;

        try {
            token = req.body["cf-turnstile-response"];
        }
        catch{}

        if (!token) {
            return await res.redirect("/contact?error=Captcha niet voltooid.");
        }

        const result = await axios.post(
            "https://challenges.cloudflare.com/turnstile/v0/siteverify",
            new URLSearchParams({
                secret: constants.CLOUDFLARE_DATA.secret_key,
                response: token,
                remoteip: req.ip,
            })
        );

        if (!result.data.success) {
            console.log("Turnstile validation failed:", result.data);
            return await res.redirect("/contact?error=Captcha validatie mislukt.");
        }

        sendContactEmail(
            req.body.name,
            req.body.email,
            req.body.message
        );

        return await res.redirect('/contact?sent=true');
    });

module.exports = router;