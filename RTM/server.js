const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public')); // folder HTML kamu

// Koneksi database
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "music_app"
});

// Cek koneksi
db.connect((err) => {
    if (err) {
        console.log("❌ Gagal konek DB:", err);
    } else {
        console.log("✅ Berhasil konek database!");
    }
});

// API Registrasi
app.post("/signup", (req, res) => {
    const { username, email, password, name } = req.body;

    const sql = `INSERT INTO users (username, email, password, full_name) VALUES (?, ?, ?, ?)`;

    db.query(sql, [username, email, password, name], (err, result) => {
        if (err) return res.json({ success: false, message: err });
        res.json({ success: true, message: "Registrasi berhasil!" });
    });
});

// API Login
app.post("/login", (req, res) => {
    const { username, password } = req.body;

    const sql = `SELECT * FROM users WHERE username = ? AND password = ?`;

    db.query(sql, [username, password], (err, result) => {
        if (err) return res.json({ success: false, message: err });

        if (result.length > 0) {
            res.json({ success: true, message: "Login berhasil!" });
        } else {
            res.json({ success: false, message: "Username atau password salah!" });
        }
    });
});

app.post("/create-playlist", (req, res) => {
  res.json({ success: true });
});


app.listen(3000, () => {
    console.log("🚀 Server running at http://localhost:3000");
});
