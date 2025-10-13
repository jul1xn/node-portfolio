const mysql = require('mysql2');
const { getMysqlCredentials } = require('./secret');
const credentials = getMysqlCredentials();

connection = mysql.createConnection({
    host: credentials.host,
    user: credentials.user,
    password: credentials.password,
    database: credentials.database
});

connection.on('error', (err) => {
    console.error('Database error:', err);
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL database.');
});

module.exports = connection;