function Navbar() {
  return (
    <nav
      className="bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 
      text-white px-10 py-4 flex justify-between items-center"
    >

      <h1 className="text-3xl font-bold">
        📚 Library MS
      </h1>

      <button
        onClick={() => {
          localStorage.removeItem("token");
          localStorage.removeItem("role");
          window.location.href = "/login";
        }}
        className="px-5 py-2 rounded-xl bg-red-500"
      >
        Logout
      </button>

    </nav>
  );
}

export default Navbar;