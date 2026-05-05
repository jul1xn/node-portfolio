const config = {
    CLOUDFLARE_DATA: {
        site_key: process.env.CLOUDFLARE_SITE_KEY,
        secret_key: process.env.CLOUDFLARE_SECRET_KEY
    },
    EMAIL_CREDENTIALS: {
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: process.env.SMTP_SECURE
    },
    EMAIL_TARGET: process.env.EMAIL_TARGET,
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

module.exports = config;