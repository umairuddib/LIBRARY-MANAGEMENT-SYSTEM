import { useEffect, useState } from "react";
import axios from "axios";
import { getStudents, deleteStudent } from "../../services/api";

function Students() {
  const [students, setStudents] = useState([]);

  // ================= FETCH STUDENTS =================
  const fetchData = async () => {
    try {
      const res = await getStudents();
      console.log("ADMIN STUDENTS:", res.data);
      setStudents(res.data);
    } catch (err) {
      console.log("FETCH ERROR:", err);
    }
  };

  // ================= LOAD ON PAGE =================
  useEffect(() => {
    fetchData();
  }, []);

  // ================= DELETE STUDENT =================
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );

    if (!confirmDelete) return;

    try {
      const res = await deleteStudent(id);

      if (res.status === 200) {
        alert("✅ Student Deleted Successfully");

        // UI update
        setStudents((prev) =>
          prev.filter((student) => student.id !== id)
        );
      }
    } catch (error) {
      console.log("DELETE ERROR:", error);
      alert("❌ Failed To Delete Student");
    }
  };

  // ================= UI =================
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-100 p-6">

      <h1 className="text-3xl font-bold text-center mb-8">
        👨‍🎓 Students Portal (Admin)
      </h1>

      {students.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          🚫 No Students Found
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          {students.map((s) => (
            <div
              key={s.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition duration-300 max-w-[280px] mx-auto"
            >
              {/* IMAGE */}
              <img
                src={
                  s.image
                    ? s.image.startsWith("http")
                      ? s.image
                      : `http://localhost:5000/uploads/${s.image}`
                    : "https://randomuser.me/api/portraits/men/32.jpg"
                }
                alt="student"
                className="w-full h-40 object-cover"
              />

              {/* CONTENT */}
              <div className="p-4 space-y-1">

                <h2 className="font-bold text-lg text-slate-800">
                  {s.name}
                </h2>

                <p className="text-sm text-slate-600">
                  🎓 {s.role}
                </p>

                <p className="text-sm text-slate-600 break-all">
                  📧 {s.email}
                </p>

                <p className="text-sm text-slate-600">
                  📞 {s.phone || "N/A"}
                </p>

                <p className="text-sm text-slate-600">
                  🏫 {s.department || "N/A"}
                </p>

                <p className="text-sm text-slate-600">
                  🎯 Semester: {s.semester || "N/A"}
                </p>

                <p className="text-sm text-slate-600">
                  📌 Section: {s.section || "N/A"}
                </p>

                <p className="text-sm text-slate-600">
                  🎟 Roll No: {s.roll_no || "N/A"}
                </p>

                {/* DELETE BUTTON */}
                <button
                  onClick={() => handleDelete(s.id)}
                  className="w-full mt-3 bg-red-500 hover:bg-red-600 text-white py-2 rounded-xl font-bold transition text-sm"
                >
                  🗑 Delete
                </button>

              </div>
            </div>
          ))}

        </div>
      )}
    </div>
  );
}

export default Students;