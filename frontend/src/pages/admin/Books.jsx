import { useEffect, useState } from "react";
import { getBooks, deleteBook, addBook } from "../../services/api";

function Books() {

  const [books, setBooks] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [msg, setMsg] = useState("");

  const [form, setForm] = useState({
    name: "",
    author: "",
    description: "",
    image: null,
  });

  // ================= FETCH BOOKS =================
  const fetchBooks = async () => {
    try {
      const res = await getBooks();
      setBooks(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // ================= DELETE BOOK =================
  const handleDelete = async (id) => {
    try {
      await deleteBook(id);

      setBooks((prev) => prev.filter((b) => b.id !== id));

      setMsg("🗑 Book deleted successfully!");

      setTimeout(() => setMsg(""), 2000);

    } catch (err) {
      console.log(err);
      setMsg("❌ Delete failed");
    }
  };

  // ================= FORM CHANGE =================
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFile = (e) => {
    setForm({ ...form, image: e.target.files[0] });
  };

  // ================= ADD BOOK =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const data = new FormData();
      data.append("name", form.name);
      data.append("author", form.author);
      data.append("description", form.description);
      data.append("image", form.image);

      await addBook(data);

      setForm({
        name: "",
        author: "",
        description: "",
        image: null,
      });

      fetchBooks();

      setMsg("✨ Book added successfully!");

      setTimeout(() => setMsg(""), 2000);

    } catch (err) {
      console.log(err);
      setMsg("❌ Add failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-100 p-6">

      {/* MESSAGE */}
      {msg && (
        <div className="text-center mb-4 text-white bg-green-500 px-4 py-2 rounded-xl w-fit mx-auto shadow-lg">
          {msg}
        </div>
      )}

      {/* ================= ADD BOOK FORM ================= */}
      <form
        onSubmit={handleSubmit}
        className="backdrop-blur-xl bg-white/60 border border-white shadow-xl rounded-2xl p-6 mb-10 max-w-2xl mx-auto"
      >
        <h2 className="text-xl font-bold mb-4 text-slate-700">
          ➕ Add Book
        </h2>

        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="📖 Book Name"
          className="w-full p-3 mb-3 rounded-xl border outline-none"
        />

        <input
          name="author"
          value={form.author}
          onChange={handleChange}
          placeholder="✍ Author Name"
          className="w-full p-3 mb-3 rounded-xl border outline-none"
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="📝 Description..."
          className="w-full p-3 mb-3 rounded-xl border outline-none"
        />

        <input type="file" onChange={handleFile} className="mb-4" />

        <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-xl font-bold hover:scale-105 transition">
          🚀 Add Book
        </button>
      </form>

      {/* ================= TITLE ================= */}
      <h2 className="text-3xl font-bold text-center mb-8 text-slate-800">
        📚 Available Books
      </h2>

      {/* ================= BOOK CARDS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

        {books.map((book) => {

          const isSelected = selectedId === book.id;

          return (
            <div
              key={book.id}
              onClick={() => setSelectedId(book.id)}
              className={`
                bg-white/80 backdrop-blur-xl shadow-xl rounded-2xl
                overflow-hidden cursor-pointer transition duration-500
                hover:scale-105
                ${isSelected ? "ring-4 ring-blue-400" : ""}
              `}
            >

              {/* IMAGE */}
              <img
                src={
                  book.image
                    ? `http://localhost:5000/uploads/${book.image}`
                    : "https://via.placeholder.com/300"
                }
                className="w-full h-60 object-cover"
              />

              {/* CONTENT */}
              <div className="p-5">

                <h2 className="text-xl font-bold">
                  📖 {book.name}
                </h2>

                <p className="text-blue-600 font-medium">
                  ✍ {book.author}
                </p>

                <p className="text-sm text-gray-600 mt-2">
                  {book.description?.slice(0, 90)}
                </p>

                {/* DELETE */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(book.id);
                  }}
                  className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-xl transition"
                >
                  🗑 Delete
                </button>

              </div>
            </div>
          );
        })}

      </div>
    </div>
  );
}

export default Books;