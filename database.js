const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./techcura.db');

db.serialize(() => {
    // Articles Table
    db.run(`CREATE TABLE IF NOT EXISTS articles (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        description TEXT,
        link TEXT
    )`);

    // Basic Case Studies Table
    db.run(`CREATE TABLE IF NOT EXISTS case_studies (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        summary TEXT,
        content TEXT
    )`);

    // Seed Data if empty
    db.get("SELECT count(*) as count FROM articles", (err, row) => {
        if (row.count === 0) {
            const stmt = db.prepare("INSERT INTO articles (title, description, link) VALUES (?, ?, ?)");

            const articles = [
                {
                    title: "Remote and Onsite Support: A Hybrid Approach",
                    description: "Discover how combining remote monitoring with onsite expertise provides the most robust IT support for your business.",
                    link: "remote-hybrid-support.html"
                },
                {
                    title: "Benefits of Outsourcing IT Services",
                    description: "Learn why outsourcing your IT needs can save costs, improve efficiency, and give you access to specialized expertise.",
                    link: "outsourcing-it-benefits.html"
                },
                {
                    title: "Ensuring Data Compliance in 2026",
                    description: "Stay ahead of regulatory changes with our guide to data privacy and compliance standards for the coming year.",
                    link: "data-compliance-2026.html"
                },
                {
                    title: "The Future of Cybersecurity",
                    description: "Explore how AI is shaping the future of digital security and what it means for your business.",
                    link: "https://www.linkedin.com/feed/update/urn:li:share:7413713882164195330/?actorCompanyId=110126777"
                }
            ];

            articles.forEach(article => {
                stmt.run(article.title, article.description, article.link);
            });

            stmt.finalize();
            console.log('Seeded Articles table.');
        }
    });
});

module.exports = db;
