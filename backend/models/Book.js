const db = require("../config/db");

const Book = {

  getAll: (callback) => {
    const sql = "SELECT * FROM books";
    db.query(sql, (err, result) => {
      if (err) return callback(err, null);
      callback(null, result);
    });
  },

  create: (data, callback) => {
    const sql =
      "INSERT INTO books (name, author, description, image) VALUES (?, ?, ?, ?)";

    db.query(
      sql,
      [data.name, data.author, data.description, data.image],
      (err, result) => {
        if (err) return callback(err, null);
        callback(null, result);
      }
    );
  },

  delete: (id, callback) => {
    const sql = "DELETE FROM books WHERE id = ?";
    db.query(sql, [id], (err, result) => {
      if (err) return callback(err, null);
      callback(null, result);
    });
  }
};

module.exports = Book;