import { Link } from "react-router-dom";

function StudentSidebar() {
  return (
    <div className="w-64 h-screen fixed left-0 top-0 
    bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-900 
    text-white p-6 shadow-[0_25px_70px_rgba(0,0,0,0.7)] 
    backdrop-blur-xl border-r border-white/10">

      <h2 className="text-2xl font-bold mb-10 text-center
      text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400">
        Student Panel
      </h2>

      <ul className="space-y-4 text-lg font-medium">

        <li>
          <Link to="/student/home" className="block px-4 py-3 rounded-2xl bg-white/5 hover:bg-green-500/20 transition">
            🏠 Home
          </Link>
        </li>

        <li>
          <Link to="/student/books" className="block px-4 py-3 rounded-2xl bg-white/5 hover:bg-yellow-500/20 transition">
            📘 My Books
          </Link>
        </li>

        <li>
          <Link to="/student/profile" className="block px-4 py-3 rounded-2xl bg-white/5 hover:bg-blue-500/20 transition">
            👤 Profile
          </Link>
        </li>

      </ul>

    </div>
  );
}

export default StudentSidebar;