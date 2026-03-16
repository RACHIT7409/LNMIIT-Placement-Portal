import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setMenuOpen(false);
    navigate("/login");
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          <Link to="/" className="group flex-shrink-0" onClick={closeMenu}>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-blue-700 hover:text-blue-800 transition duration-300 leading-tight">
              LNMIIT Placement Portal
            </h1>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-3 flex-wrap justify-end">
            <Link
              to="/"
              className="px-3 py-2 rounded-lg text-gray-700 font-medium hover:bg-blue-50 hover:text-blue-700 transition duration-300"
            >
              Home
            </Link>

            {!user && (
              <>
                <Link
                  to="/login"
                  className="px-3 py-2 rounded-lg text-gray-700 font-medium hover:bg-blue-50 hover:text-blue-700 transition duration-300"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="bg-blue-700 text-white px-4 py-2 rounded-xl font-semibold shadow hover:bg-blue-800 hover:scale-105 transition duration-300"
                >
                  Register
                </Link>
              </>
            )}

            {user && (
              <>
                <Link
                  to="/dashboard"
                  className="px-3 py-2 rounded-lg text-gray-700 font-medium hover:bg-blue-50 hover:text-blue-700 transition duration-300"
                >
                  Dashboard
                </Link>

                <Link
                  to="/companies"
                  className="px-3 py-2 rounded-lg text-gray-700 font-medium hover:bg-blue-50 hover:text-blue-700 transition duration-300"
                >
                  Companies
                </Link>

                <Link
                  to="/resources"
                  className="px-3 py-2 rounded-lg text-gray-700 font-medium hover:bg-blue-50 hover:text-blue-700 transition duration-300"
                >
                  Resources
                </Link>

                <Link
                  to="/experiences"
                  className="px-3 py-2 rounded-lg text-gray-700 font-medium hover:bg-blue-50 hover:text-blue-700 transition duration-300"
                >
                  Experiences
                </Link>

                <Link
                  to="/add-experience"
                  className="px-3 py-2 rounded-lg text-gray-700 font-medium hover:bg-blue-50 hover:text-blue-700 transition duration-300"
                >
                  Add Experience
                </Link>

                <Link
                  to="/placement-tracker"
                  className="px-3 py-2 rounded-lg text-gray-700 font-medium hover:bg-blue-50 hover:text-blue-700 transition duration-300"
                >
                  Placement Tracker
                </Link>
              </>
            )}

            {user?.role === "admin" && (
              <Link
                to="/admin"
                className="bg-blue-700 text-white px-4 py-2 rounded-xl font-semibold shadow hover:bg-blue-800 hover:scale-105 transition duration-300"
              >
                Admin Panel
              </Link>
            )}

            {user && (
              <>
                <span className="bg-blue-50 text-blue-700 px-4 py-2 rounded-xl font-medium border text-sm">
                  {user.role === "admin" ? "Admin" : "Student"}: {user.name}
                </span>

                <button
                  onClick={handleLogout}
                  className="bg-red-600 text-white px-4 py-2 rounded-xl font-semibold shadow hover:bg-red-700 hover:scale-105 transition duration-300"
                >
                  Logout
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden inline-flex items-center justify-center rounded-xl border px-3 py-2 text-gray-700 hover:bg-gray-100 transition"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile / Tablet Menu */}
        {menuOpen && (
          <div className="lg:hidden mt-4 border-t pt-4">
            <div className="flex flex-col gap-2">
              <Link
                to="/"
                onClick={closeMenu}
                className="px-4 py-3 rounded-xl text-gray-700 font-medium hover:bg-blue-50 hover:text-blue-700 transition"
              >
                Home
              </Link>

              {!user && (
                <>
                  <Link
                    to="/login"
                    onClick={closeMenu}
                    className="px-4 py-3 rounded-xl text-gray-700 font-medium hover:bg-blue-50 hover:text-blue-700 transition"
                  >
                    Login
                  </Link>

                  <Link
                    to="/register"
                    onClick={closeMenu}
                    className="bg-blue-700 text-white px-4 py-3 rounded-xl font-semibold shadow hover:bg-blue-800 transition text-center"
                  >
                    Register
                  </Link>
                </>
              )}

              {user && (
                <>
                  <Link
                    to="/dashboard"
                    onClick={closeMenu}
                    className="px-4 py-3 rounded-xl text-gray-700 font-medium hover:bg-blue-50 hover:text-blue-700 transition"
                  >
                    Dashboard
                  </Link>

                  <Link
                    to="/companies"
                    onClick={closeMenu}
                    className="px-4 py-3 rounded-xl text-gray-700 font-medium hover:bg-blue-50 hover:text-blue-700 transition"
                  >
                    Companies
                  </Link>

                  <Link
                    to="/resources"
                    onClick={closeMenu}
                    className="px-4 py-3 rounded-xl text-gray-700 font-medium hover:bg-blue-50 hover:text-blue-700 transition"
                  >
                    Resources
                  </Link>

                  <Link
                    to="/experiences"
                    onClick={closeMenu}
                    className="px-4 py-3 rounded-xl text-gray-700 font-medium hover:bg-blue-50 hover:text-blue-700 transition"
                  >
                    Experiences
                  </Link>

                  <Link
                    to="/add-experience"
                    onClick={closeMenu}
                    className="px-4 py-3 rounded-xl text-gray-700 font-medium hover:bg-blue-50 hover:text-blue-700 transition"
                  >
                    Add Experience
                  </Link>

                  <Link
                    to="/placement-tracker"
                    onClick={closeMenu}
                    className="px-4 py-3 rounded-xl text-gray-700 font-medium hover:bg-blue-50 hover:text-blue-700 transition"
                  >
                    Placement Tracker
                  </Link>
                </>
              )}

              {user?.role === "admin" && (
                <Link
                  to="/admin"
                  onClick={closeMenu}
                  className="bg-blue-700 text-white px-4 py-3 rounded-xl font-semibold shadow hover:bg-blue-800 transition text-center"
                >
                  Admin Panel
                </Link>
              )}

              {user && (
                <>
                  <div className="bg-blue-50 text-blue-700 px-4 py-3 rounded-xl font-medium border text-sm">
                    {user.role === "admin" ? "Admin" : "Student"}: {user.name}
                  </div>

                  <button
                    onClick={handleLogout}
                    className="bg-red-600 text-white px-4 py-3 rounded-xl font-semibold shadow hover:bg-red-700 transition"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;