const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");

const bookController = require("../controllers/bookController");


// ================= GET ALL BOOKS =================
router.get(
  "/",
  bookController.getBooks
);


// ================= GET SINGLE BOOK =================
router.get(
  "/:id",
  bookController.getBookById
);


// ================= ADD BOOK =================
router.post(
  "/",
  upload.single("image"),
  bookController.addBook
);


// ================= ISSUE BOOK =================
router.put(
  "/issue/:id",
  bookController.issueBook
);


// ================= RETURN BOOK =================
router.put(
  "/return/:id",
  bookController.returnBook
);


// ================= DELETE BOOK =================
router.delete(
  "/:id",
  bookController.deleteBook
);


module.exports = router;