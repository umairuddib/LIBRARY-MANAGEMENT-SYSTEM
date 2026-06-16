const db = require("../config/db");

// ================= GET ALL BOOKS =================
exports.getBooks = (req, res) => {

  const sql = `
    SELECT *
    FROM books
    ORDER BY id DESC
  `;

  db.query(sql, (err, result) => {

    if (err) {

      console.log("GET BOOKS ERROR:", err);

      return res.status(500).json({
        message: "Database Error",
      });
    }

    res.json(result);
  });
};


// ================= GET SINGLE BOOK =================
exports.getBookById = (req, res) => {

  const { id } = req.params;

  const sql = `
    SELECT *
    FROM books
    WHERE id = ?
  `;

  db.query(sql, [id], (err, result) => {

    if (err) {

      console.log("GET SINGLE BOOK ERROR:", err);

      return res.status(500).json({
        message: "Database Error",
      });
    }

    if (result.length === 0) {

      return res.status(404).json({
        message: "Book not found",
      });
    }

    res.json(result[0]);
  });
};


// ================= ADD BOOK =================
exports.addBook = (req, res) => {

  const {
    name,
    author,
    description,
  } = req.body;

  const image = req.file ? req.file.filename : null;

  // VALIDATION
  if (!name || !author) {

    return res.status(400).json({
      message: "Name and Author are required",
    });
  }

  const sql = `
    INSERT INTO books
    (
      name,
      author,
      description,
      image,
      status
    )
    VALUES (?, ?, ?, ?, 'available')
  `;

  db.query(
    sql,
    [
      name,
      author,
      description,
      image,
    ],
    (err, result) => {

      if (err) {

        console.log("ADD BOOK ERROR:", err);

        return res.status(500).json({
          message: "Database Error",
        });
      }

      res.json({
        message: "Book Added Successfully",
      });
    }
  );
};


// ================= ISSUE BOOK =================
exports.issueBook = (req, res) => {

  const { id } = req.params;

  // CHECK BOOK
  const checkSql = `
    SELECT *
    FROM books
    WHERE id = ?
  `;

  db.query(checkSql, [id], (err, result) => {

    if (err) {

      console.log("CHECK BOOK ERROR:", err);

      return res.status(500).json({
        message: "Database Error",
      });
    }

    if (result.length === 0) {

      return res.status(404).json({
        message: "Book not found",
      });
    }

    const book = result[0];

    // ALREADY ISSUED
    if (book.status === "issued") {

      return res.status(400).json({
        message: "Book already issued",
      });
    }

    // ISSUE BOOK
    const sql = `
      UPDATE books
      SET status = 'issued'
      WHERE id = ?
    `;

    db.query(sql, [id], (err) => {

      if (err) {

        console.log("ISSUE BOOK ERROR:", err);

        return res.status(500).json({
          message: "Database Error",
        });
      }

      res.json({
        message: "Book Issued Successfully",
      });
    });
  });
};


// ================= RETURN BOOK =================
exports.returnBook = (req, res) => {

  const { id } = req.params;

  // CHECK BOOK
  const checkSql = `
    SELECT *
    FROM books
    WHERE id = ?
  `;

  db.query(checkSql, [id], (err, result) => {

    if (err) {

      console.log("CHECK RETURN BOOK ERROR:", err);

      return res.status(500).json({
        message: "Database Error",
      });
    }

    if (result.length === 0) {

      return res.status(404).json({
        message: "Book not found",
      });
    }

    const book = result[0];

    // NOT ISSUED
    if (book.status === "available") {

      return res.status(400).json({
        message: "Book already returned",
      });
    }

    // RETURN BOOK
    const sql = `
      UPDATE books
      SET status = 'available'
      WHERE id = ?
    `;

    db.query(sql, [id], (err) => {

      if (err) {

        console.log("RETURN BOOK ERROR:", err);

        return res.status(500).json({
          message: "Database Error",
        });
      }

      res.json({
        message: "Book Returned Successfully",
      });
    });
  });
};


// ================= DELETE BOOK =================
exports.deleteBook = (req, res) => {

  const { id } = req.params;

  const sql = `
    DELETE FROM books
    WHERE id = ?
  `;

  db.query(sql, [id], (err) => {

    if (err) {

      console.log("DELETE BOOK ERROR:", err);

      return res.status(500).json({
        message: "Database Error",
      });
    }

    res.json({
      message: "Book Deleted Successfully",
    });
  });
};