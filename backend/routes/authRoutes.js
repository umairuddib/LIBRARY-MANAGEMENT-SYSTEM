const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const upload = require("../middleware/upload");

// LOGIN
router.post("/login", authController.login);

// REGISTER (WITH IMAGE UPLOAD)
router.post("/register", upload.single("image"), authController.register);

module.exports = router;