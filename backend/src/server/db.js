const mariadb = require("mariadb");
const path = require("path");
require("dotenv").config({
  path: path.join(__dirname, "../../config/config.env"),
});

const pool = mariadb.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "user", // Bytt denne til User bruker, slik at den bare har tilganger til visse informasjoner
  password: process.env.DB_PASS || "",
  database: process.env.DB_NAME || "chatsitedb",
  connectionLimit: 5,
});

async function getConnection() {
  return pool.getConnection();
}

module.exports = { getConnection, pool };
