const express = require('express');
const router = express.Router();
const { sendContactEmail } = require('../mail');
const { links } = require('../links');

router.get('/', (req, res) => {
  res.render('home', { links: links, page: 'Home' });
});

router.get('/about', (req, res) => {
  res.render('about', { links: links, page: 'Over mij' });
});

router.get('/cv', (req, res) => {
  res.render('cv', { links: links, page: 'CV' });
});

router.get('/ervaring', (req, res) => {
  res.render('ervaring', { links: links, page: 'Ervaring' });
});

router.get('/contact', (req, res) => {
  const success = req.query.success === 'true';
  res.render('contact', { success, links: links, page: 'Contact' });
});

router.post('/contact', (req, res) => {
  const { name, email, message } = req.body;
  sendContactEmail(name, email, message);
  res.redirect('/contact?success=true', { links: links, page: 'Contact' });
});

module.exports = router;