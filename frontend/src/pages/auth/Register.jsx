import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../services/api";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      // JSON data
      const data = {
        name,
        email,
        password,
      };

      console.log(data);

      await registerUser(data);

      alert("Registration Successful 🚀");
      navigate("/login");
    } catch (err) {
      console.log("REGISTER ERROR:", err.response || err);

      alert(
        err.response?.data?.message ||
        "Register Failed"
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900">

      <div className="w-[420px] p-10 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl">

        <h1 className="text-3xl font-bold text-white text-center mb-6">
          Register
        </h1>

        {/* NAME */}
        <input
          type="text"
          placeholder="Name"
          className="w-full p-3 mb-4 rounded-xl bg-slate-800 text-white outline-none"
          onChange={(e) => setName(e.target.value)}
        />

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 rounded-xl bg-slate-800 text-white outline-none"
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-6 rounded-xl bg-slate-800 text-white outline-none"
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* BUTTON */}
        <button
          onClick={handleRegister}
          className="w-full bg-gradient-to-r from-green-500 to-emerald-600 p-3 rounded-xl font-bold hover:scale-105 transition"
        >
          Register
        </button>

        {/* LOGIN */}
        <p className="text-center mt-4 text-sm text-white">
          Already have account?{" "}
          <Link className="text-yellow-300" to="/login">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Register;