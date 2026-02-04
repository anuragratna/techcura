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

            // Data from original index.html
            stmt.run("The Future of Cybersecurity", "Explore how AI is shaping the future of digital security and what it means for your business.", "https://www.linkedin.com/feed/update/urn:li:share:7413713882164195330/?actorCompanyId=110126777");
            stmt.run("Cloud Migration Strategies", "A comprehensive guide to moving your infrastructure to the cloud without downtime.", "#");
            stmt.run("IT Support for Remote Teams", "Best practices for managing and supporting a distributed workforce effectively.", "#");

            stmt.finalize();
            console.log('Seeded Articles table.');
        }
    });
});

module.exports = db;
