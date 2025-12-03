const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const bcrypt = require("bcryptjs");
require("dotenv").config({
  path: path.join(__dirname, "../../config/config.env"),
});

// Ensure backend/src/server/db.js exports getConnection()
const { getConnection } = require("./db");

const app = express(); // DEFINE APP BEFORE USING. DEFINE APP FIRST
const hostname = "localhost";
const port = process.env.PORT || 25565;

// Serve frontend (production). Checks common build/public folders
const candidatePaths = [
  path.join(__dirname, "../../../frontend/build"),
  path.join(__dirname, "../../../frontend/dist"),
  path.join(__dirname, "../../../frontend/public"),
];

const frontendPath = candidatePaths.find((p) => fs.existsSync(p));
if (frontendPath) {
  app.use(express.static(frontendPath));
  app.get("*", (req, res) =>
    res.sendFile(path.join(frontendPath, "index.html"))
  );
} else {
  console.warn("No frontend buld/public folder found at:", candidatePaths);
}

// Use yout DB helper that returns a connection from MariaDB pool
// Ensure backend/src/server/db.js uses MariaDB instead of MongoDB

// Middleware

app.use(express.json());
app.use(cors());

// Health route
app.post("/api/health", (req, res) => {
  res.json({ status: "OK", env: process.env.NODE_ENV || "development" });
});

// Register
app.post("/api/auth/register", async (req, res) => {
  try {
    const { name, username, password, passwordConfirm } = req.body;

    //   // Validation
    //   if (!name || !username || !password || !passwordConfirm) {
    //     return res.status(400).json({ error: "Missing required fields" });
    //   }
    //   if (password !== passwordConfirm) {
    //     return res.status(400).json({error: "Passwords do not match"});
    //   }

    //   // Check if user already exists
    //   let conn = await getConnection();
    //   const existing = await conn.query("SELECT if FROM users WHERE email = ?", [email]);
    //   conn.release();

    // }

    let conn;

    conn = await getConnection();

    const existingUser = await conn.query(
      "SELECT id FROM users WHERE username = ?",
      [username]
    );
    if (existingUser.length > 0)
      return res.status(400).json({ error: "User Already Exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    await conn.query(
      "INSERT INTO users (name, username, password, created_at) VALUES (?, ?, ?, NOW())",
      [name, username, hashedPassword]
    );

    res.status(200).json({ success: true });
  } catch (err) {
    console.error("Error during registration:", err);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    if (conn) conn.release();
  }
});

// Login
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res
      .status(400)
      .json({ error: "Missing required fields. Invalid Credentials" });

  let conn;
  try {
    conn = await getConnection();
    const rows = await conn.query(
      "SELECT id, password FROM users WHERE username = ?",
      [username]
    );
    if (rows.length === 0)
      return res.status(400).json({ error: "Invalid Credentials" });

    const user = rows[0];
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch)
      return res.status(400).json({ error: "Invalid Credentials" });

    // Return Minimal User Info
    res.json({ id: user.id, username });
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    if (conn) conn.release();
  }
});

const reactBuildPath = candidatePaths.find((p) => fs.existsSync(p));
if (reactBuildPath) {
  app.use(express.static(reactBuildPath));
  app.get("*", (req, res) =>
    res.sendFile(path.join(reactBuildPath, "index.html"))
  );
}

// Start Server
app.listen(port, hostname, () => {
  console.log(`Server Running At http://${hostname}:${port}/`);
});

module.exports = app;
