const express = require('express');
const router = express.Router();
const links = require('../links');

router.get('/', (req, res) => {
    res.render('general/index', { title: 'Home', links: links });
});

module.exports = router;