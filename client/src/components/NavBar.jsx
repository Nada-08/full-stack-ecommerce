import { useState } from "react";
import { FaSearch, FaShoppingCart, FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [search, setSearch] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", search);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="flex items-center px-6 py-4 my-2 mx-4 bg-gray-50 shadow-xl rounded-3xl">
      <div className="text-xl font-bold text-amber-400">ShopMate</div>

      {/* Search bar */}
      <form
        onSubmit={handleSearch}
        className="w-full max-w-md mx-4 hidden md:flex"
      >
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-4 py-2 border border-gray-200 rounded-3xl focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
          <span className="absolute inset-y-0 right-3 pl-3 flex items-center pointer-events-none">
            <FaSearch className="text-amber-400 w-5 h-5" />
          </span>
        </div>
      </form>

      {/* Right-side icons/links */}
      <div className="flex items-center space-x-4 ml-auto">
        {!user ? (
          <>
            <a
              href="/login"
              className="text-gray-800 text-lg font-bold hover:text-violet-600"
            >
              Login
            </a>
            <a
              href="/signup"
              className="text-gray-800 text-lg font-bold hover:text-violet-600"
            >
              Sign Up
            </a>
          </>
        ) : (
          <>
            <a href="/cart" className="text-gray-700 hover:text-amber-500">
              <FaShoppingCart size={22} />
            </a>
            <a href="/profile" className="text-gray-700 hover:text-amber-500">
              <FaUserCircle size={22} />
            </a>
            <button
              onClick={handleLogout}
              className="text-gray-700 hover:text-amber-500"
            >
              <FaSignOutAlt size={22} />
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
