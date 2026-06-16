const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");
const studentController = require("../controllers/studentController");

// ================= GET ALL STUDENTS =================
router.get("/", studentController.getStudents);

// ================= GET SINGLE STUDENT (PROFILE) =================
router.get("/:id", studentController.getStudentById);

// ================= ADD STUDENT =================
router.post("/", upload.single("image"), studentController.addStudent);

// ================= UPDATE PROFILE =================
router.put("/:id", upload.single("image"), studentController.updateStudent);

// ================= DELETE STUDENT =================
router.delete("/:id", studentController.deleteStudent);

module.exports = router;