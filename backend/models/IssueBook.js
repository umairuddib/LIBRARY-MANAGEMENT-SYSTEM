const db = require("../config/db");

const IssueBook = {

  // 📌 ISSUE BOOK
  issueBook: (data, callback) => {
    const sql = `
      INSERT INTO issued_books (book_id, student_id, issue_date) 
      VALUES (?, ?, ?)
    `;

    db.query(sql, [data.book_id, data.student_id, data.issue_date], (err, result) => {
      if (err) return callback(err, null);
      callback(null, result);
    });
  },

  // 📌 GET ALL ISSUED BOOKS
  getAll: (callback) => {
    const sql = `
      SELECT ib.*, b.title, u.name 
      FROM issued_books ib
      JOIN books b ON ib.book_id = b.id
      JOIN users u ON ib.student_id = u.id
    `;

    db.query(sql, (err, result) => {
      if (err) return callback(err, null);
      callback(null, result);
    });
  },

  // 📌 RETURN BOOK
  returnBook: (id, callback) => {
    const sql = "DELETE FROM issued_books WHERE id = ?";

    db.query(sql, [id], (err, result) => {
      if (err) return callback(err, null);
      callback(null, result);
    });
  }

};

module.exports = IssueBook;