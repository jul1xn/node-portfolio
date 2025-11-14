const express = require('express');
const router = express.Router();
const constants = require('../constants');

router.get('/', (req, res) => {
    res.render('general/index', { title: 'Home', links: constants.NAVBAR_LINKS, name: constants.WEBSITE_NAME });
});

router.get('/over-mij', (req, res) => {
    res.render('general/overmij', { title: 'Over mij', links: constants.NAVBAR_LINKS, name: constants.WEBSITE_NAME });
});

router.get('/ervaring', (req, res) => {
    res.render('general/ervaring', { title: 'Ervaring', links: constants.NAVBAR_LINKS, name: constants.WEBSITE_NAME });
});

router.get('/cv', (req, res) => {
    res.render('general/cv', { title: 'CV', links: constants.NAVBAR_LINKS, name: constants.WEBSITE_NAME });
});

router.get('/contact', (req, res) => {
    res.render('general/contact', { title: 'Contact', links: constants.NAVBAR_LINKS, name: constants.WEBSITE_NAME });
});

module.exports = router;