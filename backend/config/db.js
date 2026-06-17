const mysql = require("mysql2");

console.log("🔍 MySQL config — host:", process.env.MYSQLHOST, "| user:", process.env.MYSQLUSER, "| database:", process.env.MYSQLDATABASE, "| port:", process.env.MYSQLPORT);

const db = mysql.createPool({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  port: process.env.MYSQLPORT,
});

// Test connection
db.getConnection((err, connection) => {
  if (err) {
    console.log("❌ MySQL Connection Failed:", err.message);
    console.log("❌ Full error:", err);
  } else {
    console.log("✅ MySQL Connected");
    connection.release();
  }
});

module.exports = db;