import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import {
  issueBook,
  getIssuedBooks,
  getBooks,
} from "../../services/api";

function IssueBooks() {

  // ================= STATES =================
  const [books, setBooks] = useState([]);

  const [formData, setFormData] = useState({
    student_name: "",
    book_id: "",
    issue_date: "",
    return_date: "",
  });

  const [issuedBooks, setIssuedBooks] = useState([]);

  const [msg, setMsg] = useState("");

  // ================= HANDLE CHANGE =================
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ================= FETCH BOOKS =================
  const fetchBooks = async () => {

    try {

      const res = await getBooks();

      // ONLY AVAILABLE BOOKS
      const availableBooks = res.data.filter(
        (b) => b.status === "available"
      );

      setBooks(availableBooks);

    } catch (err) {

      console.log(err);
    }
  };

  // ================= FETCH ISSUED BOOKS =================
  const fetchIssuedBooks = async () => {

    try {

      const res = await getIssuedBooks();

      setIssuedBooks(res.data);

    } catch (err) {

      console.log(err);
    }
  };

  // ================= ISSUE BOOK =================
  const handleIssueBook = async (e) => {

    e.preventDefault();

    try {

      // FIND BOOK
      const selectedBook = books.find(
        (b) => b.id == formData.book_id
      );

      if (!selectedBook) {

        setMsg("❌ Please Select Book");

        return;
      }

      // ISSUE BOOK ENTRY
      await issueBook({
        student_name: formData.student_name,
        book_name: selectedBook.name,
        book_id: selectedBook.id,
        issue_date: formData.issue_date,
        return_date: formData.return_date,
        fine: 250,
        status: "Issued",
      });

      // UPDATE BOOK STATUS
      await fetch(
        `http://localhost:5000/api/books/issue/${selectedBook.id}`,
        {
          method: "PUT",
        }
      );

      setMsg("✅ Book Issued Successfully!");

      setTimeout(() => {
        setMsg("");
      }, 3000);

      // RESET
      setFormData({
        student_name: "",
        book_id: "",
        issue_date: "",
        return_date: "",
      });

      // REFRESH
      fetchBooks();
      fetchIssuedBooks();

    } catch (err) {

      console.log(err);

      setMsg("❌ Failed To Issue Book");
    }
  };

  // ================= LOAD =================
  useEffect(() => {

    fetchBooks();
    fetchIssuedBooks();

  }, []);

  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-100 p-6">

      {/* MESSAGE */}
      {msg && (
        <div className="text-center mb-4 text-white bg-green-500 px-4 py-2 rounded-xl w-fit mx-auto shadow-lg">
          {msg}
        </div>
      )}

      {/* FORM */}
      <form
        onSubmit={handleIssueBook}
        className="backdrop-blur-xl bg-white/70 border border-white shadow-xl rounded-2xl p-6 mb-10 max-w-2xl mx-auto"
      >

        <h2 className="text-2xl font-bold mb-5 text-slate-700">
          📚 Issue Book
        </h2>

        {/* STUDENT NAME */}
        <input
          name="student_name"
          value={formData.student_name}
          onChange={handleChange}
          placeholder="👤 Student Name"
          required
          className="w-full p-3 mb-4 rounded-xl border outline-none"
        />

        {/* BOOK SELECT */}
        <select
          name="book_id"
          value={formData.book_id}
          onChange={handleChange}
          required
          className="w-full p-3 mb-4 rounded-xl border outline-none"
        >

          <option value="">
            📖 Select Book
          </option>

          {books.map((book) => (

            <option
              key={book.id}
              value={book.id}
            >
              {book.name}
            </option>
          ))}

        </select>

        {/* ISSUE DATE */}
        <input
          type="date"
          name="issue_date"
          value={formData.issue_date}
          onChange={handleChange}
          required
          className="w-full p-3 mb-4 rounded-xl border outline-none"
        />

        {/* RETURN DATE */}
        <input
          type="date"
          name="return_date"
          value={formData.return_date}
          onChange={handleChange}
          required
          className="w-full p-3 mb-5 rounded-xl border outline-none"
        />

        {/* BUTTON */}
        <button
          className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 rounded-xl font-bold hover:scale-105 transition"
        >
          🚀 Issue Book
        </button>

      </form>

      {/* TITLE */}
      <h2 className="text-3xl font-bold text-center mb-8 text-slate-800">
        📊 Issued Books
      </h2>

      {/* CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {issuedBooks.map((book, index) => (

          <motion.div
            key={book.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.4,
              delay: index * 0.1,
            }}
            whileHover={{
              scale: 1.03,
            }}
            className="bg-white rounded-2xl shadow-xl p-5"
          >

            <h2 className="text-lg font-bold mb-2">
              📖 {book.book_name}
            </h2>

            <p className="text-blue-600 font-medium">
              👤 {book.student_name}
            </p>

            <p className="text-sm text-gray-600 mt-2">
              📅 Issue:
              {" "}
              {book.issue_date?.split("T")[0]}
            </p>

            <p className="text-sm text-gray-600">
              ⏳ Return:
              {" "}
              {book.return_date?.split("T")[0]}
            </p>

            <p className="text-red-500 font-bold mt-3">
              💰 Fine: Rs {book.fine}
            </p>

            <p className="text-green-600 font-semibold mt-1">
              Status: {book.status}
            </p>

          </motion.div>
        ))}

      </div>

    </div>
  );
}

export default IssueBooks;