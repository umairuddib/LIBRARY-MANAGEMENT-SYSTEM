import { useEffect, useState } from "react";
import {
  getIssuedBooks,
  returnBook,
  deleteIssuedBook
} from "../../services/api";

function Returns() {

  const [books, setBooks] = useState([]);
  const [msg, setMsg] = useState("");

  const fetchBooks = async () => {
    try {
      const res = await getIssuedBooks();
      setBooks(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // RETURN
  const handleReturn = async (book) => {
    try {

      await returnBook(book.id);

      setMsg("✅ Book Returned Successfully!");
      fetchBooks();

    } catch (err) {
      console.log(err);
      setMsg("❌ Return Failed");
    }
  };

  // DELETE
  const handleDelete = async (id) => {
    try {

      if (!id) {
        setMsg("❌ Invalid ID");
        return;
      }

      await deleteIssuedBook(id);

      setMsg("🗑️ Record Deleted Successfully!");
      fetchBooks();

    } catch (err) {
      console.log(err.response?.data || err.message);
      setMsg("❌ Delete Failed");
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-slate-100 to-blue-100">

      {msg && (
        <div className="text-center mb-4 bg-green-500 text-white px-4 py-2 rounded-xl">
          {msg}
        </div>
      )}

      <h1 className="text-3xl font-bold text-center mb-8">
        🔁 Return Books
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {books.map((book) => (
          <div key={book.id} className="bg-white p-5 rounded-2xl shadow-xl">

            <h2 className="font-bold">📖 {book.book_name}</h2>
            <p>👤 {book.student_name}</p>

            <p>📅 {book.issue_date?.split("T")[0]}</p>
            <p>⏳ {book.return_date?.split("T")[0]}</p>

            <p>💰 Fine: {book.fine}</p>
            <p>Status: {book.status}</p>

            {/* RETURN */}
            <button
              onClick={() => handleReturn(book)}
              disabled={book.status === "Returned"}
              className="w-full mt-3 bg-green-500 text-white py-2 rounded-xl"
            >
              {book.status === "Returned" ? "✔ Returned" : "Return"}
            </button>

            {/* DELETE (ONLY AFTER RETURN) */}
            {book.status === "Returned" && (
              <button
                onClick={() => handleDelete(book.id)}
                className="w-full mt-2 bg-red-500 text-white py-2 rounded-xl"
              >
                Delete Record
              </button>
            )}

          </div>
        ))}

      </div>
    </div>
  );
}

export default Returns;