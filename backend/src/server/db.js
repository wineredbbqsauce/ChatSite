const useMock = process.env.USE_MOCK_DB === "true";

if (useMock) {
  module.exports = require("./mock-db.js");
  return;
}

// Try to load real mariadb pool (ensure config/connect.cjs exports { host, user, password, database })

const mariadb = require("mariadb");
const config = require("../../config/config.cjs");

const pool = mariadb.createPool({
  host: config.db.host,
  user: config.db.user,
  password: config.db.password,
  database: config.db.database,
  connectionLimit: config.db.connectionLimit || 5,
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
