const fs = require('fs');

// Function to get the admin key from secrets.json
function getAdminKey() {
    const secrets = JSON.parse(fs.readFileSync('./secrets.json', 'utf8'));
    return secrets.admin_edit_key;
}

function getMysqlCredentials() {
    const secrets = JSON.parse(fs.readFileSync('./secrets.json', 'utf8'));
    return secrets.mysql_credentials;
}

module.exports = { getAdminKey, getMysqlCredentials };