const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('home');
});

router.get('/contact', (req, res) => {
  res.render('contact');
});

router.post('/contact', (req, res) => {
  console.log(req.body);
  const { name, email, message } = req.body;
  console.log(`Received contact form submission: Name=${name}, Email=${email}, Message=${message}`);
  res.redirect('/contact');
});

module.exports = router;