import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/axios";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      setLoggingIn(true);

      const { data } = await API.post("/auth/login", formData, {
        timeout: 30000,
      });

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setMessage("Login successful!");
      navigate("/");
      window.location.reload();
    } catch (err) {
      if (err.code === "ECONNABORTED") {
        setError("Login request timed out. Please try again.");
      } else {
        setError(err.response?.data?.message || "Login failed");
      }
    } finally {
      setLoggingIn(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gray-50 flex items-center justify-center px-4 sm:px-6">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-6 sm:p-8 border">
        <h2 className="text-3xl font-extrabold text-center mb-2">
          Welcome Back
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Login to continue your placement preparation.
        </p>

        {message && (
          <p className="text-green-600 mb-3 text-center">{message}</p>
        )}
        {error && <p className="text-red-600 mb-3 text-center">{error}</p>}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            disabled={loggingIn}
            className={`w-full px-4 py-3 rounded-lg font-semibold text-white transition ${
              loggingIn
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-700 hover:bg-blue-800"
            }`}
          >
            {loggingIn ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-blue-700 font-semibold hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;