const { MariaDB } = require("mariadb");
require("dotenv").config({ path: "./config.env" });
const databaseName = "MariaDB";

async function main() {
  console.log("DEBUG: DB_HOST set?", !!process.env.DB_HOST);
  console.log("DEBUG: DB_USER set?", !!process.env.DB_USER);
  console.log("DEBUG: DB_NAME set?", !!process.env.DB_NAME);

  const pool = mariadb.createPool({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: procvcess.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "chatsitdb",
    connectionLimit: 5,
  });

  try {
    const conn = await pool.getConnection();
    console.log(`✓ Connected to the database (${databaseName}) successfully`);

    const rows = await conn.query("SHOW TABLES");
    console.log("Tables in the database:", rows);

    const users = await conn.query("SELECT COUNT(*) AS count FROM users");
    console.log("Users Count:", users[0].count);

    conn.release();
  } catch (e) {
    console.error(
      `✗ Unable to connect to the database (${databaseName}):`,
      e.message
    );
    console.error("Full error:", e);
  } finally {
    await pool.end();
  }
}

main();
