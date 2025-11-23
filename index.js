const express = require('express');
const compression = require('compression');
const app = express();

app.set('view engine', 'ejs');
// app.use(
//   express.static('public', {
//     maxAge: 86400000,
//     setHeaders: function (res, path) {
//       res.setHeader("Expires", new Date(Date.now() + 2592000000 * 30).toUTCString());
//     }
//   })
// );

app.use(express.static('public'));

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(compression());

const generalRoutes = require('./routes/general');
app.use('/', generalRoutes);

const projectenRoutes = require('./routes/projecten');
app.use('/projecten', projectenRoutes);

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});