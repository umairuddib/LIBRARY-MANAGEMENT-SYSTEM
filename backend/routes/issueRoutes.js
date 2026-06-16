const express = require("express");
const router = express.Router();

const issueController = require("../controllers/issueController");

// ISSUE
router.post("/", issueController.issueBook);

// GET
router.get("/", issueController.getIssuedBooks);

// RETURN
router.put("/return/:id", issueController.returnBook);

// DELETE
router.delete("/:id", issueController.deleteIssuedBook);

module.exports = router;