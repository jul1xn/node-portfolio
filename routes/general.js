const express = require('express');
const router = express.Router();
const constants = require('../constants');
const { sendContactEmail } = require('../mail');

router.get('/', (req, res) => {
    res.render('general/index', { title: 'Home', links: constants.NAVBAR_LINKS, name: constants.WEBSITE_NAME, short: constants.SHORT_NAME });
});

router.get('/over-mij', (req, res) => {
    res.render('general/overmij', { title: 'Over mij', links: constants.NAVBAR_LINKS, name: constants.WEBSITE_NAME, short: constants.SHORT_NAME  });
});

router.get('/ervaring', (req, res) => {
    res.render('general/ervaring', { title: 'Ervaring', links: constants.NAVBAR_LINKS, name: constants.WEBSITE_NAME, short: constants.SHORT_NAME  });
});

router.get('/cv', (req, res) => {
    res.render('general/cv', { title: 'CV', links: constants.NAVBAR_LINKS, name: constants.WEBSITE_NAME, short: constants.SHORT_NAME  });
});


router.route('/contact')
    .get((req, res) => {
        const sent = req.query.sent === 'true';
        res.render('general/contact', { sent: sent, title: 'Contact', links: constants.NAVBAR_LINKS, name: constants.WEBSITE_NAME, short: constants.SHORT_NAME  });
    })
    .post((req, res) => {
        sendContactEmail(req.body.name, req.body.email, req.body.message)
            .then((messageId) => {
                console.log('Contact email sent with message ID:', messageId);
            });
        res.redirect('/contact?sent=true');
    });

module.exports = router;