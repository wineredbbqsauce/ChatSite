const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { getConnection } = require("../src/server/db.js");
const router = express.Router();

// JWT SECRET (Should be in .env file)
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-this";

router.post("/register", async (req, res) => {
  const { name, username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ error: "Missing Fields " });

  let conn;
  try {
    conn = await getConnection();
    const existing = await conn.query(
      "SELECT id FROM users WHERE username = ?",
      [username]
    );
    if (existing.length > 0)
      return res.status(400).json({ error: "User Already Exists " });

    const hashed = await bcrypt.hash(password, 10);
    const result = await conn.query(
      "INSERT INTO users (name, username, password, createdAt) VALUES (?, ?, ?, NOW())",
      [name, username, hashed]
    );

    // Generate JWT token for new user
    const token = jwt.sign(
      {
        id: result.insertId,
        username: username,
      },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      success: true,
      token: token,
      user: {
        id: result.insertId,
        username: username,
        name: name,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error " });
  } finally {
    if (conn) conn.release();
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  let conn;
  try {
    conn = await getConnection();
    const rows = await conn.query(
      "SELECT id, name, username, password FROM users WHERE username = ?",
      [username]
    );
    if (rows.length === 0)
      return res.status(400).json({ error: "Invalid Credentials" });
    const user = rows[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ error: "Invalid Credentials " });

    // GEnerate JWT token
    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
      },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      success: true,
      token: token,
      user: {
        id: user.id,
        username: user.username,
        name: user.name,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error " });
  } finally {
    if (conn) conn.release();
  }
});

module.exports = router;
