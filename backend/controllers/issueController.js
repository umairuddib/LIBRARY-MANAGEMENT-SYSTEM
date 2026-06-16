const db = require("../config/db");

// ISSUE BOOK
exports.issueBook = (req, res) => {
    console.log("BODY:", req.body);
  const {
    student_id,
    book_id,
    student_name,
    book_name,
    issue_date,
    return_date,
    fine,
    status
  } = req.body;

  const sql = `
    INSERT INTO issued_books 
    (student_id, book_id, student_name, book_name, issue_date, return_date, fine, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      student_id,
      book_id,
      student_name,
      book_name,
      issue_date,
      return_date,
      fine,
      status
    ],
    (err) => {
      if (err) {
        console.log(err);
        return res.status(500).json(err);
      }

      res.json({ message: "Issued Successfully" });
    }
  );
};

// GET ISSUED
exports.getIssuedBooks = (req, res) => {
  db.query(
    "SELECT * FROM issued_books ORDER BY id DESC",
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    }
  );
};

// RETURN BOOK
exports.returnBook = (req, res) => {
  const { id } = req.params;

  db.query(
    "UPDATE issued_books SET status='Returned' WHERE id=?",
    [id],
    (err) => {
      if (err) return res.status(500).json(err);

      res.json({
        message: "Returned Successfully",
        fine: 250
      });
    }
  );
};

// DELETE ISSUED BOOK
exports.deleteIssuedBook = (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM issued_books WHERE id=?", [id], (err) => {
    if (err) return res.status(500).json(err);

    res.json({ message: "Deleted Successfully" });
  });
};