const fs = require('fs');
const secrets = JSON.parse(fs.readFileSync('./secrets.json', 'utf8'));

const constants = {
    ADMIN_EDIT_KEY: secrets.admin_edit_key,
    MYSQL_CREDENTIALS: secrets.mysql_credentials,
    EMAIL_CREDENTIALS: secrets.email_credentials,
    EMAIL_TARGET: secrets.email_target,
    NAVBAR_LINKS: [
        { name: "Home", url: "/" },
        { name: "Over mij", url: "/over-mij" },
        { name: "Projecten", url: "/projecten" },
        { name: "Ervaring", url: "/ervaring" },
        { name: "CV", url: "/cv" },
        { name: "Contact", url: "/contact" }
    ],
    WEBSITE_NAME: "Portfolio - Julian Verwoerd"
}

module.exports = constants;