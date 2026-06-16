import { Link } from "react-router-dom";

function StudentNavbar() {
  return (
    <nav className="bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 text-white px-10 py-4 flex justify-between items-center 
    shadow-[0_25px_70px_rgba(0,0,0,0.7)] backdrop-blur-xl border-b border-white/10">

      {/* LOGO */}
      <h1 className="text-3xl font-bold tracking-wide cursor-pointer 
      text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-cyan-400 to-blue-400 
      hover:scale-110 transition duration-500">
        📚 Student Panel
      </h1>

      {/* LINKS */}
      <ul className="flex gap-6 text-lg font-medium">

        <li>
          <Link to="/student/home" className="px-4 py-2 rounded-xl bg-white/5 border border-white/10
          hover:scale-110 hover:bg-green-500/20 transition">
            🏠 Home
          </Link>
        </li>

        <li>
          <Link to="/student/books" className="px-4 py-2 rounded-xl bg-white/5 border border-white/10
          hover:scale-110 hover:bg-yellow-500/20 transition">
            📘 My Books
          </Link>
        </li>

        <li>
          <Link to="/student/profile" className="px-4 py-2 rounded-xl bg-white/5 border border-white/10
          hover:scale-110 hover:bg-blue-500/20 transition">
            👤 Profile
          </Link>
        </li>

      </ul>

      {/* OPTIONAL AUTH */}
      <div className="flex gap-3">

        <Link to="/login">
          <button className="px-5 py-2 rounded-2xl bg-white/10 border border-white/20 hover:scale-110 transition">
            Logout
          </button>
        </Link>

      </div>

    </nav>
  );
}

export default StudentNavbar;