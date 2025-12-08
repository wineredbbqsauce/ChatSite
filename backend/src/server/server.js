const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
// const bcrypt = require("bcryptjs");
require("dotenv").config({
  path: path.join(__dirname, "../../../config/config.env"),
});

// Import routes and middleware
const authRoutes = require("../../routes/auth.js");
const authenticateToken = require("../../middleware/auth.js");
// Ensure backend/src/server/db.js exports getConnection()
const { getConnection } = require("./db");

const app = express(); // DEFINE APP BEFORE USING. DEFINE APP FIRST
const hostname = "0.0.0.0";
const port = process.env.PORT || 25565;

// Middleware (MUST be before routes)
app.use(express.json());
app.use(cors());

// API Routes
// Public routes (no authentication required)
app.use("/api/auth", authRoutes); // This handles /api/routes/register and /api/auth/login

// Health route
app.post("/api/health", (req, res) => {
  res.json({ status: "OK", env: process.env.NODE_ENV || "development" });
});

// Protected routes (authentication requiresd)
app.get("/api/verify-token", authenticateToken, (req, res) => {
  res.json({
    valid: true,
    user: req.user,
  });
});

app.get("/api/user/profile", authenticateToken, async (req, res) => {
  let conn;
  try {
    conn = await getConnection();
    const rows = await conn.query(
      "SELECT id, name, username, createdAt FROM users WHERE id = ?",
      [req.user.id]
    );
    if (rows.lenght === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({
      success: true,
      user: rows[0],
    });
  } catch {
    console.error("Error fetching profile:", err);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    if (conn) conn.release();
  }
});

// Example: Protected Message route:
app.get("api/message", authenticateToken, async (req, res) => {
  // Access user ID with: req.use.id
  // Your Message logic here
  res.json({
    success: true,
    userId: req.user.id,
    message: [], // Your message array
  });
});

// Serve frontend (production). Checks common build/public folders - MUST be AFTER API routes
const candidatePaths = [
  path.join(__dirname, "../../../frontend/build"),
  path.join(__dirname, "../../../frontend/dist"),
  path.join(__dirname, "../../../frontend/public"),
];

const frontendPath = candidatePaths.find((p) => fs.existsSync(p));
if (frontendPath) {
  app.use(express.static(frontendPath));

  // Catch-all routes for React Router (MUST be last)
  app.get("*", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
} else {
  console.warn("No frontend buld/public folder found at:", candidatePaths);
}

// Start Server
app.listen(port, hostname, () => {
  console.log(`Server Running At http://${hostname}:${port}/`);
});

// Use yout DB helper that returns a connection from MariaDB pool
// Ensure backend/src/server/db.js uses MariaDB instead of MongoDB

/**
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
*/
module.exports = app;
