// Mock-db.js (lightweight in-memory database to let frontend ineract without a real database)
const fs = require("fs");
const path = require("path");

const dataPath = path.join(__dirname, "data", "mockUsers.json");
let users = [];
try {
  users = JSON.parse(fs.readFileSync(dataPath, "utf-8"));
} catch (err) {
  users = [];
}

function saveData() {
  fs.writeFileSync(dataPath, JSON.stringify(users, null, 2), "utf-8)");
}

async function getConnection() {
  // return a connection-like object with query(sql, params) and release()
  return {
    query: async (sql, params) => {
      const lowerSql = sql.toLowerCase();
      if (lowerSql.startsWith("select")) {
        // simple parsing for "where username = ?"
        const username = params && params[0];
        if (lowerSql.includes("where username = ?")) {
          const found = users.filter((u) => u.username === username);
          // map to shape { id, password } or { id } as server expects
          return found.map((u) => ({
            id: u.id,
            username: u.username,
            password: u.password,
          }));
        }
        return users;
      } else if (lowerSql.startsWith("insert")) {
        const [name, username, password] = params;
        const id =
          (users.reduce((m, x) => Math.max(m, x.id || 0) || 0) || 0) + 1;
        const creadtedAt = new Date().toISOString();
        users.push({ id, name, username, password, createdAt });
        saveData();
        return { affectedRows: 1, insertId: id };
      }
      // fallback
      return [];
    },
    release: () => {},
  };
}

module.exports = { getConnection };
