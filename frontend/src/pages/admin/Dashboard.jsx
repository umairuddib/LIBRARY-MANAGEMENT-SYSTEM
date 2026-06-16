import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {

  const [books, setBooks] = useState([]);
  const [students, setStudents] = useState([]);
  const [issued, setIssued] = useState([]);

  const fetchData = async () => {
    try {

      const [b, s, i] = await Promise.all([
        axios.get("http://localhost:5000/api/books"),
        axios.get("http://localhost:5000/api/students"),
        axios.get("http://localhost:5000/api/issues")
      ]);

      setBooks(b.data);
      setStudents(s.data);
      setIssued(i.data);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen p-8 text-white bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900">

      {/* HEADER */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold">📊 Admin Dashboard</h1>
        <p className="text-gray-400 mt-2">
          Library overview & analytics
        </p>
      </div>

      {/* TOP CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* BOOKS */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl hover:scale-105 transition">
          <p className="text-gray-400">📚 Total Books</p>
          <h2 className="text-4xl font-bold mt-2 text-white">
            {books.length}
          </h2>
        </div>

        {/* STUDENTS */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl hover:scale-105 transition">
          <p className="text-gray-400">👨‍🎓 Students</p>
          <h2 className="text-4xl font-bold mt-2 text-white">
            {students.length}
          </h2>
        </div>

        {/* ISSUED */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl hover:scale-105 transition">
          <p className="text-gray-400">📖 Issued Books</p>
          <h2 className="text-4xl font-bold mt-2 text-white">
            {issued.length}
          </h2>
        </div>

      </div>

      {/* LOWER SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">

        {/* QUICK STATS */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-lg">

          <h3 className="text-xl font-bold mb-5">📌 Quick Stats</h3>

          <div className="space-y-4 text-sm">

            <div className="flex justify-between">
              <span className="text-gray-400">Available Books</span>
              <span className="text-green-400 font-bold">
                {books.filter(b => b.status === "available").length}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-400">Issued Books</span>
              <span className="text-yellow-400 font-bold">
                {issued.filter(i => i.status === "Issued").length}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-400">Returned Books</span>
              <span className="text-blue-400 font-bold">
                {issued.filter(i => i.status === "Returned").length}
              </span>
            </div>

          </div>

        </div>

        {/* SYSTEM OVERVIEW */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-lg">

          <h3 className="text-xl font-bold mb-5">📈 System Overview</h3>

          <div className="space-y-4 text-sm">

            <div className="flex justify-between">
              <span className="text-gray-400">Active Students</span>
              <span className="text-purple-400 font-bold">
                {students.length}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-400">Total Records</span>
              <span className="text-cyan-400 font-bold">
                {books.length + students.length + issued.length}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-400">System Status</span>
              <span className="text-green-400 font-bold">
                Active
              </span>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;