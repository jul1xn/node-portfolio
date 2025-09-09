const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

const projectRoutes = require('./routes/projects');
app.use('/projecten', projectRoutes);

const adminRoutes = require('./routes/admin');
app.use('/admin', adminRoutes);

const generalRoutes = require('./routes/general');
app.use('/', generalRoutes);

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});