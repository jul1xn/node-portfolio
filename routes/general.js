const express = require('express');
const router = express.Router();
const { sendContactEmail } = require('../mail');
const { links } = require('../links');

router.get('/', (req, res) => {
  res.render('home', { links: links});
});

router.get('/contact', (req, res) => {
  const success = req.query.success === 'true';
  res.render('contact', { success, links: links });
});

router.post('/contact', (req, res) => {
  const { name, email, message } = req.body;
  sendContactEmail(name, email, message);
  res.redirect('/contact?success=true', { links: links });
});

module.exports = router;