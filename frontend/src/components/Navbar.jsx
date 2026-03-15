import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="group">
          <h1 className="text-3xl font-extrabold text-blue-700 hover:text-blue-800 transition duration-300">
            LNMIIT Placement Portal
          </h1>
        </Link>

        <div className="flex items-center gap-3 flex-wrap">
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
              <span className="bg-blue-50 text-blue-700 px-4 py-2 rounded-xl font-medium border">
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
      </div>
    </nav>
  );
};

export default Navbar;