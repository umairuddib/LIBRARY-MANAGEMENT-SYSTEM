const db = require("../config/db");

// ================= GET ALL STUDENTS =================
exports.getStudents = (req, res) => {
  const sql = `
    SELECT id, name, email, phone, department, semester, section,
           roll_no, father_name, address, admission_date, image,
           role, profile_completed
    FROM users
    WHERE role = 'student'
    ORDER BY id DESC
  `;

  db.query(sql, (err, result) => {
    if (err) {
      console.log("GET STUDENTS ERROR:", err);
      return res.status(500).json({ message: "Database Error" });
    }

    res.json(result);
  });
};

// ================= GET SINGLE STUDENT =================
exports.getStudentById = (req, res) => {
  const { id } = req.params;

  const sql = `SELECT * FROM users WHERE id = ?`;

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.log("GET SINGLE STUDENT ERROR:", err);
      return res.status(500).json({ message: "Database Error" });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json(result[0]);
  });
};

// ================= ADD STUDENT =================
exports.addStudent = (req, res) => {
  const { name, email, password } = req.body;
  const image = req.file ? req.file.filename : null;

  const sql = `
    INSERT INTO users (name, email, password, image, role, profile_completed)
    VALUES (?, ?, ?, ?, 'student', 0)
  `;

  db.query(sql, [name, email, password, image], (err) => {
    if (err) {
      console.log("ADD STUDENT ERROR:", err);
      return res.status(500).json({ message: "Database Error" });
    }

    res.json({ success: true, message: "Student added successfully" });
  });
};

// ================= UPDATE PROFILE =================
exports.updateStudent = (req, res) => {
  const { id } = req.params;

  const {
    name,
    email,
    phone,
    department,
    semester,
    section,
    roll_no,
    father_name,
    address,
    admission_date,
  } = req.body;

  const image = req.file ? req.file.filename : null;

  let sql;
  let values;

  if (image) {
    sql = `
      UPDATE users
      SET name=?, email=?, phone=?, department=?, semester=?, section=?,
          roll_no=?, father_name=?, address=?, admission_date=?, image=?,
          profile_completed=1
      WHERE id=?
    `;

    values = [
      name,
      email,
      phone,
      department,
      semester,
      section,
      roll_no,
      father_name,
      address,
      admission_date,
      image,
      id,
    ];
  } else {
    sql = `
      UPDATE users
      SET name=?, email=?, phone=?, department=?, semester=?, section=?,
          roll_no=?, father_name=?, address=?, admission_date=?,
          profile_completed=1
      WHERE id=?
    `;

    values = [
      name,
      email,
      phone,
      department,
      semester,
      section,
      roll_no,
      father_name,
      address,
      admission_date,
      id,
    ];
  }

  db.query(sql, values, (err) => {
    if (err) {
      console.log("UPDATE PROFILE ERROR:", err);
      return res.status(500).json({ message: "Database Error" });
    }

    res.json({ success: true, message: "Profile Updated Successfully" });
  });
};

// ================= DELETE STUDENT =================
exports.deleteStudent = (req, res) => {
  const { id } = req.params;

  const sql = `DELETE FROM users WHERE id = ?`;

  db.query(sql, [id], (err) => {
    if (err) {
      console.log("DELETE STUDENT ERROR:", err);
      return res.status(500).json({ message: "Database Error" });
    }

    res.json({ success: true, message: "Student deleted successfully" });
  });
};