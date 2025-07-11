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
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-3xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Welcome Back</h2>

        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
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
            <label className="block text-sm font-medium text-gray-700 mb-1">
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
              className="px-2 py-1 text-amber-500 font-semibold hover:text-amber-600"
              style={{ fontSize: "1rem" }}
            >
              Sign Up
            </a>
          </div>

          <button
            type="submit"
            onClick={handleSubmit}
            disabled={loading}
            className="mt-7 px-8 py-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-3xl transition block mx-auto"
            style={{ minWidth: "180px" }}
          >
            {loading ? "Logging in..." : "Login  "}
          </button>
        </form>
      </div>
    </div>
  );
};
