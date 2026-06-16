import { Routes, Route, Navigate } from "react-router-dom";

// Auth
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

// Admin
import Dashboard from "./pages/admin/Dashboard";
import Books from "./pages/admin/Books";
import Students from "./pages/admin/Students";
import IssueBooks from "./pages/admin/IssueBooks";
import Returns from "./pages/admin/Returns";

// Student
import Home from "./pages/student/Home";
import MyBooks from "./pages/student/MyBooks";
import Profile from "./pages/student/Profile";

// Layouts
import AdminLayout from "./AdminLayout";
import StudentLayout from "./StudentLayout";

function App() {
  return (

    <Routes>

      {/* DEFAULT ROOT */}
      <Route
        path="/"
        element={<Navigate to="/login" />}
      />

      {/* 🔐 AUTH */}
      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      {/* 🟣 ADMIN */}
      <Route
        path="/admin"
        element={<AdminLayout />}
      >

        <Route
          index
          element={<Dashboard />}
        />

        <Route
          path="books"
          element={<Books />}
        />

        <Route
          path="students"
          element={<Students />}
        />

        <Route
          path="issue"
          element={<IssueBooks />}
        />

        <Route
          path="returns"
          element={<Returns />}
        />

      </Route>

      {/* 🟢 STUDENT */}
      <Route
        path="/student"
        element={<StudentLayout />}
      >

        <Route
          path="home"
          element={<Home />}
        />

        <Route
          path="books"
          element={<MyBooks />}
        />

        <Route
          path="profile"
          element={<Profile />}
        />

      </Route>

      {/* UNKNOWN ROUTE */}
      <Route
        path="*"
        element={<Navigate to="/login" />}
      />

    </Routes>

  );
}

export default App;