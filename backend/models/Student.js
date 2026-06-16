const db = require("../config/db");

const Student = {

  getAll: (callback) => {
    db.query("SELECT * FROM users WHERE role='student'", callback);
  },

  create: (data, callback) => {
    const sql = "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, 'student')";
    db.query(sql, [data.name, data.email, data.password], callback);
  },

  delete: (id, callback) => {
    db.query("DELETE FROM users WHERE id = ?", [id], callback);
  }

};

module.exports = Student;