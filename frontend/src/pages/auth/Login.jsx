import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../services/api";

function Login() {

  // ================= STATES =================
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  // ================= LOGIN =================
  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const res = await loginUser({
        email,
        password,
      });

      console.log("LOGIN RESPONSE:", res.data);

      // ================= SAVE TOKEN =================
      localStorage.setItem(
        "token",
        res.data.token
      );

      // ================= SAVE ROLE =================
      localStorage.setItem(
        "role",
        res.data.user.role
      );

      // ================= SAVE USER =================
      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      alert("Login Successful 🚀");

      // ================= ADMIN =================
      if (res.data.user.role === "admin") {

        navigate("/admin");

      }

      // ================= STUDENT =================
      else {

        navigate("/student/home");

      }

    } catch (err) {

      console.log("LOGIN ERROR:", err);

      alert(
        err.response?.data?.message ||
        "Login Failed"
      );
    }
  };

  return (

    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900">

      <div className="w-[420px] p-10 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_20px_60px_rgba(0,0,0,0.6)]">

        {/* TITLE */}
        <h1 className="text-3xl font-bold text-white text-center mb-6">
          Login
        </h1>

        {/* FORM */}
        <form onSubmit={handleLogin}>

          {/* EMAIL */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 mb-4 rounded-2xl bg-slate-800 text-white outline-none"
          />

          {/* PASSWORD */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 mb-6 rounded-2xl bg-slate-800 text-white outline-none"
          />

          {/* LOGIN BUTTON */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 p-3 rounded-2xl font-bold shadow-lg hover:scale-105 transition"
          >
            Login
          </button>

        </form>

        {/* REGISTER */}
        <p className="text-center mt-4 text-sm text-white">

          Don’t have account?{" "}

          <Link
            className="text-yellow-300"
            to="/register"
          >
            Register
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Login;