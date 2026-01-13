const fs = require('fs');
const secrets = JSON.parse(fs.readFileSync('./secrets.json', 'utf8'));

const constants = {
    CLOUDFLARE_DATA: secrets.cloudflare,
    ADMIN_EDIT_KEY: secrets.admin_edit_key,
    MYSQL_CREDENTIALS: secrets.mysql_credentials,
    EMAIL_CREDENTIALS: secrets.email_credentials,
    EMAIL_TARGET: secrets.email_target,
    NAVBAR_LINKS: [
        { name: "Home", url: "/" },
        { name: "Over mij", url: "/over-mij" },
        { name: "Projecten", url: "/projecten" },
        { name: "Contact", url: "/contact" }
    ],
    WEBSITE_NAME: "Portfolio - Julian Verwoerd",
    SHORT_NAME: "Prowser",
    PROJECTEN_PAGE_AANTAL: 9,
    PROJECTEN_AVAILABLE_TECH: [
        "Arduino",
        "C#",
        "WinForms",
        "CSS",
        "HTML",
        "Javascript",
        "Lua",
        "Java",
        "MySQL",
        "Node.js",
        "PHP",
        "Python",
        "Unity",
    ],
    HOMEPAGE_PROJECTEN: [
        "minecraft_clone", "portfolio_website", "school_examen_game"
    ],
}

module.exports = constants;