const mysql = require("mysql2");

const db = mysql.createPool({
  host: "mysql.railway.internal",
  user: "root",
  password: "OVOwXrJZYiHhVNnYgwYVwRNcxBNqnEFs",
  database: "railway",
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  connectTimeout: 20000,
  ssl: { rejectUnauthorized: false },
});

db.getConnection((err, connection) => {
  if (err) {
    console.log("❌ MySQL Connection Failed:", err.message);
    return;
  }
  console.log("✅ MySQL Connected");
  connection.release();
});

module.exports = db;