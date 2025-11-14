const express = require('express');
const router = express.Router();
const constants = require('../constants');

router.get('/', (req, res) => {
    res.render('general/projecten', { title: 'Projecten', links: constants.NAVBAR_LINKS, name: constants.WEBSITE_NAME, short: constants.SHORT_NAME });
});

module.exports = router;