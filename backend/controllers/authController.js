const db = require("../config/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// ================= REGISTER =================
exports.register = (req, res) => {
  const name = req.body?.name;
  const email = req.body?.email;
  const password = req.body?.password;

  // ✅ validation
  if (!name || !email || !password) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  const sql =
    "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)";

  db.query(sql, [name, email, hashedPassword, "student"], (err) => {
    if (err) return res.status(500).json(err);

    res.json({ message: "User Registered Successfully" });
  });
};

// ================= LOGIN =================
exports.login = (req, res) => {
  const email = req.body?.email;
  const password = req.body?.password;

  if (!email || !password) {
    return res.status(400).json({
      message: "Email and Password required",
    });
  }

  // 🔐 ADMIN LOGIN (HARD CODED)
  if (email === "admin1122@gmail.com" && password === "1122qq") {
    const token = jwt.sign(
      { id: 0, role: "admin" },
      "secretkey123",
      { expiresIn: "1d" }
    );

    return res.json({
      message: "Admin Login Successful",
      token,
      user: {
        id: 0,
        name: "Admin",
        email: "admin1122@gmail.com",
        role: "admin",
      },
    });
  }

  // 👤 STUDENT LOGIN
  const sql = "SELECT * FROM users WHERE email = ?";

  db.query(sql, [email], (err, result) => {
    if (err) return res.status(500).json(err);

    if (result.length === 0) {
      return res.status(401).json({
        message: "Invalid Credentials",
      });
    }

    const user = result[0];

    const isMatch = bcrypt.compareSync(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid Credentials",
      });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      "secretkey123",
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login Successful",
      token,
      user,
    });
  });
};