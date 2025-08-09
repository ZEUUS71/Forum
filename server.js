const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Base de données SQLite
const db = new sqlite3.Database('./forum.db', (err) => {
    if (err) console.error(err.message);
    console.log("✅ Connecté à la base SQLite");
});

// Créer la table si elle n'existe pas
db.run(`CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT,
    message TEXT
)`);

// Récupérer les messages
app.get('/messages', (req, res) => {
    db.all("SELECT * FROM messages ORDER BY id DESC", [], (err, rows) => {
        if (err) throw err;
        res.json(rows);
    });
});

// Ajouter un message
app.post('/messages', (req, res) => {
    const { username, message } = req.body;
    db.run("INSERT INTO messages (username, message) VALUES (?, ?)", [username, message], function(err) {
        if (err) throw err;
        res.json({ id: this.lastID, username, message });
    });
});

// Lancer le serveur
app.listen(port, () => {
    console.log(`🚀 Serveur démarré sur${port}`);
});
