const express = require('express');
const router = express.Router();
const { sendContactEmail } = require('../mail');

router.get('/', (req, res) => {
  res.render('home');
});

router.get('/contact', (req, res) => {
  const success = req.query.success === 'true';
  res.render('contact', { success });
});

router.post('/contact', (req, res) => {
  const { name, email, message } = req.body;
  sendContactEmail(name, email, message);
  res.redirect('/contact?success=true');
});

module.exports = router;