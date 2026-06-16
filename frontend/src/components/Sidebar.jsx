import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div
      className="w-64 h-screen fixed left-0 top-0 
    bg-gradient-to-b from-slate-950 via-purple-950 to-slate-900 
    text-white p-6 shadow-[0_25px_70px_rgba(0,0,0,0.7)] 
    backdrop-blur-xl border-r border-white/10"
    >

      <h2
        className="text-2xl font-bold mb-10 text-center
      text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400"
      >
        Admin Panel
      </h2>

      <ul className="space-y-4 text-lg font-medium">

        <li>
          <Link
            to="/admin"
            className="block px-4 py-3 rounded-2xl bg-white/5 border border-white/10
          hover:scale-105 hover:bg-indigo-500/20 transition"
          >
            📊 Dashboard
          </Link>
        </li>

        <li>
          <Link
            to="/admin/books"
            className="block px-4 py-3 rounded-2xl bg-white/5 border border-white/10
          hover:scale-105 hover:bg-purple-500/20 transition"
          >
            📚 Books
          </Link>
        </li>

        <li>
          <Link
            to="/admin/students"
            className="block px-4 py-3 rounded-2xl bg-white/5 border border-white/10
          hover:scale-105 hover:bg-pink-500/20 transition"
          >
            👨‍🎓 Students
          </Link>
        </li>

        <li>
          <Link
            to="/admin/issue"
            className="block px-4 py-3 rounded-2xl bg-white/5 border border-white/10
          hover:scale-105 hover:bg-green-500/20 transition"
          >
            🔄 Issue Books
          </Link>
        </li>

        <li>
          <Link
            to="/admin/returns"
            className="block px-4 py-3 rounded-2xl bg-white/5 border border-white/10
          hover:scale-105 hover:bg-yellow-500/20 transition"
          >
            ↩ Returns
          </Link>
        </li>

      </ul>
    </div>
  );
}

export default Sidebar;