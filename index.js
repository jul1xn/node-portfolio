const express = require('express');
const compression = require('compression');
const config = require('./config');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const ENVIRONMENT = process.env.NODE_ENV ?? "development";

app.use((req, res, next) => {
  res.locals.env = ENVIRONMENT ;
  next();
})

app.set('view engine', 'ejs');
app.use(
  express.static('public', {
    maxAge: 2592000000,
    setHeaders: function (res, path) {
      res.setHeader(
        "Expires",
        new Date(Date.now() + 2592000000).toUTCString() 
      );
    }
  })
);

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(compression());

const generalRoutes = require('./routes/general');
app.use('/', generalRoutes);

const projectenRoutes = require('./routes/projecten');
app.use('/projecten', projectenRoutes);

app.use((req, res) => {
  res.status(404).render('general/error', {
    title: '404 niet gevonden',
    links: config.NAVBAR_LINKS,
    name: config.WEBSITE_NAME,
    short: config.SHORT_NAME
  });
});

app.listen(3001, () => {
  console.log('Server is running on http://localhost:3001');
});