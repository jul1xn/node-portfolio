const express = require('express');
const router = express.Router();
const constants = require('../constants');

router.get('/', (req, res) => {
    res.render('general/index', { title: 'Home', links: constants.NAVBAR_LINKS, name: constants.WEBSITE_NAME });
});

module.exports = router;