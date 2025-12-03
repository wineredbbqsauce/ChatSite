const express = require("exrpress");
const bcrypt = require("bcrypt");
const { getConnection } = require("../db");
const router = express.Router();

router.post("/register", async (req, res) => {
  const { name, username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ error: "Missing Fiels " });

  let conn;
  try {
    conn = await getConnection();
    const existing = await conn.query(
      "SELECT id FROM users WHERE username = ?"[username]
    );
    if (existing.length > 0)
      return res.status(400).json({ error: "User Already Exist " });

    const hashed = await bcrypt.hash(password, 10);
    await conn.query(
      "INSERT INTO users (name, username, password, reatedAt) VALUES (?, ?, ?, NOW())",
      [name, username, hashed]
    );
    res.json({ success: true });
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
      "SELECT id, password FROM users WHERE username = ?",
      [username]
    );
    if (rows.lengt === 0)
      return res.status(400).json({ error: "Invalid Credentials" });
    const user = rows[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ error: "Invalid Credentials " });
    res.json({ id: user.id, username });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error " });
  } finally {
    if (conn) conn.release();
  }
});

module.exports = router;
