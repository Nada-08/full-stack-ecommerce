import { useState } from "react";
import {
  FaSearch,
  FaShoppingCart,
  FaUserCircle,
  FaSignOutAlt,
} from "react-icons/fa";
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
    <nav className="flex items-center px-6 py-4 mx-4 my-2 shadow-xl bg-gray-50 rounded-3xl">
      <a href="/" className="text-xl font-bold text-amber-400">
        ShopMate
      </a>

      {/* Search bar */}
      <form
        onSubmit={handleSearch}
        className="hidden w-full max-w-md mx-4 md:flex"
      >
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-4 py-2 border border-gray-200 rounded-3xl focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
          <span className="absolute inset-y-0 flex items-center pl-3 pointer-events-none right-3">
            <FaSearch className="w-5 h-5 text-amber-400" />
          </span>
        </div>
      </form>

      <div className="flex items-center ml-auto space-x-4">
        {!user ? (
          <>
            <a
              href="/login"
              className="text-lg font-bold text-gray-800 hover:text-violet-600"
            >
              Login
            </a>
            <a
              href="/signup"
              className="text-lg font-bold text-gray-800 hover:text-violet-600"
            >
              Sign Up
            </a>
          </>
        ) : (
          <>
            <a href="/cart" className="p-1.5 text-amber-500 hover:text-violet-600">
              <FaShoppingCart size={22} />
            </a>
            <a href="/profile" className="p-1.5 text-amber-500 hover:text-violet-600">
              <FaUserCircle size={22} />
            </a>
            <button
              onClick={handleLogout}
              className="p-1.5 text-amber-500 hover:text-violet-600"
            >
              <FaSignOutAlt size={22} />
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
