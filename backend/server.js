const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();

// ===================== MIDDLEWARE =====================
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://library-management-system-sage-beta.vercel.app"
  ],
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ===================== STATIC FILES =====================
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ===================== HEALTH CHECK =====================
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "🚀 Library Management API is running successfully",
  });
});

// ===================== ROUTES =====================

// AUTH
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

// BOOKS
const bookRoutes = require("./routes/bookRoutes");
app.use("/api/books", bookRoutes);

// STUDENTS
const studentRoutes = require("./routes/studentRoutes");
app.use("/api/students", studentRoutes);

// ISSUES / RETURN
const issueRoutes = require("./routes/issueRoutes");
app.use("/api/issues", issueRoutes);

// ===================== 404 HANDLER =====================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "❌ Route Not Found",
  });
});

// ===================== ERROR HANDLER =====================
app.use((err, req, res, next) => {
  console.error("❌ SERVER ERROR:", err);

  res.status(500).json({
    success: false,
    message: "Something went wrong on server",
    error: err.message,
  });
});

// ===================== START SERVER =====================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});