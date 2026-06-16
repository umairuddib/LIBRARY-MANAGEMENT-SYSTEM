import { useEffect, useState } from "react";
import {
  getBooks,
  getIssuedBooks,
  issueBook,
  returnBook,
} from "../../services/api";

import StudentNavbar from "../../components/StudentNavbar";
import StudentSidebar from "../../components/StudentSidebar";

function MyBooks() {

  const user = JSON.parse(localStorage.getItem("user"));

  const [books, setBooks] = useState([]);
  const [issuedBooks, setIssuedBooks] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [returnDate, setReturnDate] = useState("");

  // ================= BOOKS =================
  const fetchBooks = async () => {
    const res = await getBooks();
    setBooks(res.data.filter(b => b.status === "available"));
  };

  // ================= ISSUED BOOKS =================
  const fetchIssuedBooks = async () => {
    const res = await getIssuedBooks();

    const mine = res.data.filter(
      (b) => String(b.student_id) === String(user?.id)
    );

    setIssuedBooks(mine);
  };

  useEffect(() => {
    fetchBooks();
    fetchIssuedBooks();
  }, []);

  // ================= ISSUE =================
  const openModal = (book) => {
    setSelectedBook(book);
    setShowModal(true);
  };

  const handleIssue = async () => {
    try {

      const payload = {
        student_id: user?.id,
        student_name: user?.name,
        book_id: selectedBook?.id,
        book_name: selectedBook?.name,
        issue_date: new Date().toISOString().split("T")[0],
        return_date: returnDate,
        fine: 0,
        status: "Issued",
      };

      await issueBook(payload);

      setShowModal(false);
      setReturnDate("");
      setSelectedBook(null);

      fetchBooks();
      fetchIssuedBooks();

      alert("Book Issued ✔");

    } catch (err) {
      console.log(err);
    }
  };

  // ================= RETURN =================
  const handleReturn = async (book) => {
    await returnBook(book.id);
    fetchIssuedBooks();
    alert("Book Returned ✔");
  };

  return (

    <div className="min-h-screen bg-gray-50">

      {/* SIDEBAR */}
      <div className="fixed left-0 top-0 h-full w-64">
        <StudentSidebar />
      </div>

      <div className="ml-64">

        {/* NAVBAR */}
        <div className="fixed left-64 right-0 top-0 z-10">
          <StudentNavbar />
        </div>

        <div className="pt-20 p-6">

          {/* ================= AVAILABLE BOOKS ================= */}
          <h2 className="text-2xl font-bold mb-6">📚 Available Books</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {books.map((book) => (

              <div key={book.id} className="bg-white shadow-xl rounded-2xl overflow-hidden">

                <img
                  src={
                    book.image
                      ? `http://localhost:5000/uploads/${book.image}`
                      : "https://via.placeholder.com/300"
                  }
                  className="w-full h-48 object-cover"
                />

                <div className="p-4">

                  <h2 className="font-bold">📖 {book.name}</h2>
                  <p className="text-gray-600">✍ {book.author}</p>

                  <button
                    onClick={() => openModal(book)}
                    className="mt-3 w-full bg-blue-500 text-white py-2 rounded-xl"
                  >
                    Issue Book
                  </button>

                </div>

              </div>

            ))}

          </div>

          {/* ================= ISSUED BOOKS (TABLE FIXED) ================= */}
          <h2 className="text-2xl font-bold mt-10 mb-4">
            📖 My Issued Books
          </h2>

          <div className="overflow-x-auto">

            <table className="w-full bg-white shadow rounded-xl">

              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3">Book</th>
                  <th className="p-3">Issue Date</th>
                  <th className="p-3">Return Date</th>
                  <th className="p-3">Fine</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>

              <tbody>

                {issuedBooks.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center p-4">
                      No Books Issued Yet
                    </td>
                  </tr>
                ) : (

                  issuedBooks.map((book) => (

                    <tr key={book.id} className="text-center border-t">

                      <td className="p-3 font-semibold">
                        {book.book_name}
                      </td>

                      <td className="p-3">
                        {book.issue_date}
                      </td>

                      <td className="p-3">
                        {book.return_date}
                      </td>

                      <td className="p-3 text-red-500">
                        Rs {book.fine}
                      </td>

                      <td className="p-3">
                        <span className={
                          book.status === "Issued"
                            ? "text-green-600 font-semibold"
                            : "text-gray-500"
                        }>
                          {book.status}
                        </span>
                      </td>

                      <td className="p-3">

                        {book.status === "Issued" ? (
                          <button
                            onClick={() => handleReturn(book)}
                            className="bg-green-500 text-white px-3 py-1 rounded"
                          >
                            Return
                          </button>
                        ) : (
                          <span className="text-gray-400">
                            Done
                          </span>
                        )}

                      </td>

                    </tr>

                  ))

                )}

              </tbody>

            </table>

          </div>

        </div>
      </div>

      {/* ================= MODAL ================= */}
      {showModal && (

        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">

          <div className="bg-white p-6 rounded-xl w-96">

            <h2 className="text-xl font-bold mb-3">Issue Book</h2>

            <p><b>Student:</b> {user?.name}</p>
            <p><b>Book:</b> {selectedBook?.name}</p>

            <input
              type="date"
              className="w-full border p-2 mt-3"
              onChange={(e) => setReturnDate(e.target.value)}
            />

            <div className="flex justify-between mt-4">

              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-400 px-4 py-2 rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleIssue}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Issue
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default MyBooks;