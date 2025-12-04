const useMock = process.env.USE_MOCK_DB === "true";

if (useMock) {
  module.exports = require("./mock-db.js");
  return;
}

// Try to load real mariadb pool (ensure config/connect.cjs exports { host, user, password, database })

const mariadb = require("mariadb");
const path = require("path");
// const config = require("../../config/connect.cjs");

require("dotenv").config({
  path: path.join(__dirname, "../../../config/config.env"),
});

const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 5,
});

async function getConnection() {
  const conn = await pool.getConnection();

  // Wrapt query to return rwos directly to match mockDb interface
  const originalQuery = conn.query.bind(conn);
  conn.query = async (sql, params) => {
    const res = await originalQuery(sql, params);
    // MariaDBd return an array for SELECT and an object for INSER/UPDATE; normalie SELECT
    return Array.isArray(res) ? res : res;
  };
  return conn;
}

module.exports = { getConnection };
