const express = require('express');
const router = express.Router();
const config = require('../config');
const { sendContactEmail } = require('../mail');
const axios = require('axios');

// Async wrapper to handle errors and forward to next()
const asyncHandler = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

// Home page
router.get('/', asyncHandler(async (req, res) => {
    await res.render('general/index', { title: 'Home'});
}));

// About me page
router.get('/over-mij', asyncHandler(async (req, res) => {
    await res.render('general/overmij', { title: "Over mij" });
}));

// Contact page
router.route('/contact')
    .get(asyncHandler(async (req, res) => {
        const sent = req.query.sent === 'true';
        await res.render('general/contact', {
            error: req.query.error,
            site_key: config.CLOUDFLARE_DATA.site_key,
            sent,
            title: 'Contact'
        });
    }))
    .post(asyncHandler(async (req, res) => {
        const token = req.body["cf-turnstile-response"];
        if (!token) return res.redirect("/contact?error=Captcha niet voltooid.");

        // Cloudflare Turnstile validation
        const result = await axios.post(
            "https://challenges.cloudflare.com/turnstile/v0/siteverify",
            new URLSearchParams({
                secret: config.CLOUDFLARE_DATA.secret_key,
                response: token,
                remoteip: req.ip
            })
        );

        if (!result.data.success) {
            console.log("Turnstile validation failed:", result.data);
            return res.redirect("/contact?error=Captcha validatie mislukt.");
        }

        // Send email (non-blocking)
        await sendContactEmail(req.body.name, req.body.email, req.body.message);

        return res.redirect('/contact?sent=true');
    }));

module.exports = router;