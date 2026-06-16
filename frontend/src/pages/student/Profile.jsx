import { useEffect, useState } from "react";
import axios from "axios";

import StudentNavbar from "../../components/StudentNavbar";
import StudentSidebar from "../../components/StudentSidebar";

function Profile() {

  // ================= USER =================
  const user = JSON.parse(localStorage.getItem("user"));

  // ================= STATES =================
  const [student, setStudent] = useState({
    name: "",
    father_name: "",
    roll_no: "",
    email: "",
    phone: "",
    department: "",
    semester: "",
    section: "",
    address: "",
    admission_date: "",
    role: "Student",
    image: null,
  });

  const [preview, setPreview] = useState(
    "https://randomuser.me/api/portraits/men/32.jpg"
  );

  const [msg, setMsg] = useState("");

  // ================= FETCH PROFILE =================
  useEffect(() => {

    const fetchProfile = async () => {

      try {

        const res = await axios.get(
          `http://localhost:5000/api/students/${user.id}`
        );

        console.log("PROFILE DATA:", res.data);

        setStudent({
          name: res.data.name || "",
          father_name: res.data.father_name || "",
          roll_no: res.data.roll_no || "",
          email: res.data.email || "",
          phone: res.data.phone || "",
          department: res.data.department || "",
          semester: res.data.semester || "",
          section: res.data.section || "",
          address: res.data.address || "",
          admission_date: res.data.admission_date
            ? res.data.admission_date.split("T")[0]
            : "",
          role: res.data.role || "Student",
          image: null,
        });

        // IMAGE PREVIEW
        if (res.data.image) {

          // if uploaded image
          if (
            res.data.image.startsWith("http")
          ) {
            setPreview(res.data.image);
          } else {
            setPreview(
              `http://localhost:5000/uploads/${res.data.image}`
            );
          }
        }

      } catch (error) {

        console.log(error);

        setMsg("❌ Failed To Load Profile");
      }
    };

    fetchProfile();

  }, [user.id]);

  // ================= HANDLE CHANGE =================
  const handleChange = (e) => {

    setStudent({
      ...student,
      [e.target.name]: e.target.value,
    });
  };

  // ================= HANDLE IMAGE =================
  const handleImage = (e) => {

    const file = e.target.files[0];

    if (!file) return;

    setStudent({
      ...student,
      image: file,
    });

    setPreview(URL.createObjectURL(file));
  };

  // ================= SUBMIT =================
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const formData = new FormData();

      formData.append("name", student.name);
      formData.append("father_name", student.father_name);
      formData.append("roll_no", student.roll_no);
      formData.append("email", student.email);
      formData.append("phone", student.phone);
      formData.append("department", student.department);
      formData.append("semester", student.semester);
      formData.append("section", student.section);
      formData.append("address", student.address);
      formData.append("admission_date", student.admission_date);

      // only if image selected
      if (student.image) {
        formData.append("image", student.image);
      }

      const res = await axios.put(
        `http://localhost:5000/api/students/${user.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(res.data);

      // ================= UPDATE LOCAL STORAGE =================
      const updatedUser = {
        ...user,
        name: student.name,
        email: student.email,
      };

      localStorage.setItem(
        "user",
        JSON.stringify(updatedUser)
      );

      setMsg("✅ Profile Updated Successfully!");

      setTimeout(() => {
        setMsg("");
      }, 3000);

    } catch (error) {

      console.log(error);

      if (error.response) {
        console.log(error.response.data);
      }

      setMsg("❌ Failed To Update Profile");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900">

      {/* NAVBAR */}
      <StudentNavbar />

      <div className="flex">

        {/* SIDEBAR */}
        <StudentSidebar />

        {/* MAIN */}
        <div className="flex-1 ml-72 p-8 text-white">

          {/* TITLE */}
          <h1 className="text-4xl font-bold mb-6">
            👤 My Profile
          </h1>

          {/* MESSAGE */}
          {msg && (
            <div className="mb-6 bg-green-500/20 border border-green-400 p-4 rounded-2xl text-green-200">
              {msg}
            </div>
          )}

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="bg-white/10 p-10 rounded-3xl shadow-2xl backdrop-blur-lg border border-white/10 max-w-5xl"
          >

            {/* IMAGE */}
            <div className="flex justify-center mb-8 flex-col items-center">

              <img
                src={preview}
                alt="student"
                className="w-32 h-32 rounded-full border-4 border-cyan-400 object-cover shadow-2xl"
              />

              <input
                type="file"
                onChange={handleImage}
                className="mt-4"
              />

            </div>

            {/* GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* NAME */}
              <input
                type="text"
                name="name"
                placeholder="Student Name"
                value={student.name}
                onChange={handleChange}
                required
                className="w-full p-4 rounded-2xl bg-slate-900/60 border border-white/10 outline-none"
              />

              {/* FATHER NAME */}
              <input
                type="text"
                name="father_name"
                placeholder="Father Name"
                value={student.father_name}
                onChange={handleChange}
                required
                className="w-full p-4 rounded-2xl bg-slate-900/60 border border-white/10 outline-none"
              />

              {/* ROLL NO */}
              <input
                type="text"
                name="roll_no"
                placeholder="Roll No"
                value={student.roll_no}
                onChange={handleChange}
                required
                className="w-full p-4 rounded-2xl bg-slate-900/60 border border-white/10 outline-none"
              />

              {/* EMAIL */}
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={student.email}
                onChange={handleChange}
                required
                className="w-full p-4 rounded-2xl bg-slate-900/60 border border-white/10 outline-none"
              />

              {/* PHONE */}
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={student.phone}
                onChange={handleChange}
                required
                className="w-full p-4 rounded-2xl bg-slate-900/60 border border-white/10 outline-none"
              />

              {/* DEPARTMENT */}
              <input
                type="text"
                name="department"
                placeholder="Department"
                value={student.department}
                onChange={handleChange}
                required
                className="w-full p-4 rounded-2xl bg-slate-900/60 border border-white/10 outline-none"
              />

              {/* SEMESTER */}
              <input
                type="text"
                name="semester"
                placeholder="Semester"
                value={student.semester}
                onChange={handleChange}
                required
                className="w-full p-4 rounded-2xl bg-slate-900/60 border border-white/10 outline-none"
              />

              {/* SECTION */}
              <input
                type="text"
                name="section"
                placeholder="Section"
                value={student.section}
                onChange={handleChange}
                required
                className="w-full p-4 rounded-2xl bg-slate-900/60 border border-white/10 outline-none"
              />

              {/* ADMISSION DATE */}
              <input
                type="date"
                name="admission_date"
                value={student.admission_date}
                onChange={handleChange}
                required
                className="w-full p-4 rounded-2xl bg-slate-900/60 border border-white/10 outline-none"
              />

            </div>

            {/* ADDRESS */}
            <div className="mt-6">

              <textarea
                name="address"
                placeholder="Address"
                value={student.address}
                onChange={handleChange}
                required
                rows="4"
                className="w-full p-4 rounded-2xl bg-slate-900/60 border border-white/10 outline-none"
              />

            </div>

            {/* BUTTON */}
            <button
              type="submit"
              className="mt-8 w-full bg-gradient-to-r from-cyan-500 to-blue-600 py-4 rounded-2xl text-xl font-bold hover:scale-105 transition"
            >
              💾 Update Profile
            </button>

          </form>

        </div>
      </div>
    </div>
  );
}

export default Profile;