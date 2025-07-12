import React, { useState } from "react";
import { login } from "../services/authService";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await login(email, password);
      setLoading(false);
      if (response.success) {
        localStorage.setItem("token", response.token);
        localStorage.setItem("user", JSON.stringify(response.user));
        navigate("/");
      } else {
        alert(response.message || "Sign up failed.");
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-3xl">
        <h2 className="mb-6 text-2xl font-bold text-center">Welcome Back</h2>

        <form>
          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-700 rounded-3xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-700 rounded-3xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>

          <div className="flex items-center justify-center mb-6">
            <span className="text-sm text-gray-600">
              Don't have an account?
            </span>
            <a
              href="/signup"
              className="px-2 py-1 font-semibold text-amber-500 hover:text-amber-600"
              style={{ fontSize: "1rem" }}
            >
              Sign Up
            </a>
          </div>

          <button
            type="submit"
            onClick={handleSubmit}
            disabled={loading}
            className="block px-8 py-2 mx-auto font-semibold text-white transition mt-7 bg-amber-500 hover:bg-amber-600 rounded-3xl"
            style={{ minWidth: "180px" }}
          >
            {loading ? "Logging in..." : "Login  "}
          </button>
        </form>
      </div>
    </div>
  );
};
