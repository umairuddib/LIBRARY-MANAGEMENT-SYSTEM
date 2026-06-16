import { useEffect, useState } from "react";
import StudentNavbar from "../../components/StudentNavbar";
import StudentSidebar from "../../components/StudentSidebar";
import { getBooks, getIssuedBooks } from "../../services/api";

function Home() {

  const user = JSON.parse(localStorage.getItem("user"));

  const [books, setBooks] = useState([]);
  const [issuedBooks, setIssuedBooks] = useState([]);

  // ================= FETCH DATA =================
  const fetchData = async () => {

    const booksRes = await getBooks();
    const issuedRes = await getIssuedBooks();

    setBooks(booksRes.data);

    const myBooks = issuedRes.data.filter(
      (b) => String(b.student_id) === String(user?.id)
    );

    setIssuedBooks(myBooks);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ================= CALCULATIONS =================

  const totalBooks = books.length;

  const issuedCount = issuedBooks.length;

  const pendingReturns = issuedBooks.filter(
    (b) => b.status === "Issued"
  ).length;

  return (

    <div className="min-h-screen bg-white">

      {/* NAVBAR */}
      <StudentNavbar />

      <div className="flex">

        {/* SIDEBAR */}
        <StudentSidebar />

        {/* MAIN */}
        <div className="flex-1 ml-72 p-8">

          <h1 className="text-4xl font-bold mb-6">
            Student Dashboard
          </h1>

          {/* WELCOME CARD */}
          <div className="bg-white p-8 rounded-3xl shadow-xl border">

            <h2 className="text-2xl font-bold mb-2">
              Welcome {user?.name} 👋
            </h2>

            <p className="text-gray-600">
              Track your books, issued history and returns in real time.
            </p>

            {/* STATS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">

              {/* TOTAL BOOKS */}
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6 rounded-3xl shadow-lg hover:scale-105 transition">

                <h3 className="text-3xl font-bold">
                  {totalBooks}
                </h3>

                <p>Available Books</p>

              </div>

              {/* ISSUED BOOKS */}
              <div className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white p-6 rounded-3xl shadow-lg hover:scale-105 transition">

                <h3 className="text-3xl font-bold">
                  {issuedCount}
                </h3>

                <p>My Issued Books</p>

              </div>

              {/* PENDING RETURNS */}
              <div className="bg-gradient-to-r from-pink-500 to-red-500 text-white p-6 rounded-3xl shadow-lg hover:scale-105 transition">

                <h3 className="text-3xl font-bold">
                  {pendingReturns}
                </h3>

                <p>Pending Returns</p>

              </div>

            </div>

          </div>

        </div>
      </div>

    </div>
  );
}

export default Home;