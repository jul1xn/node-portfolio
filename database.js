const mysql = require('mysql2');
const { getMysqlCredentials } = require('./secret');
const credentials = getMysqlCredentials();

connection = mysql.createConnection({
    host: credentials.host,
    user: credentials.user,
    password: credentials.password,
    database: credentials.database
});

module.exports = connection;