import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Companies from "./pages/Companies";
import CompanyDetails from "./pages/CompanyDetails";
import Resources from "./pages/Resources";
import Experiences from "./pages/Experiences";
import AddExperience from "./pages/AddExperience";
import AdminDashboard from "./pages/AdminDashboard";
import ManageCompanies from "./pages/ManageCompanies";
import ManageResources from "./pages/ManageResources";
import ManageExperiences from "./pages/ManageExperiences";
import PlacementTracker from "./pages/PlacementTracker";
import ManagePlacements from "./pages/ManagePlacements";

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Student/Admin Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/companies"
          element={
            <ProtectedRoute>
              <Companies />
            </ProtectedRoute>
          }
        />

        <Route
          path="/companies/:id"
          element={
            <ProtectedRoute>
              <CompanyDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/resources"
          element={
            <ProtectedRoute>
              <Resources />
            </ProtectedRoute>
          }
        />

        <Route
          path="/experiences"
          element={
            <ProtectedRoute>
              <Experiences />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-experience"
          element={
            <ProtectedRoute>
              <AddExperience />
            </ProtectedRoute>
          }
        />

        <Route
          path="/placement-tracker"
          element={
            <ProtectedRoute>
              <PlacementTracker />
            </ProtectedRoute>
          }
        />

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/companies"
          element={
            <AdminRoute>
              <ManageCompanies />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/resources"
          element={
            <AdminRoute>
              <ManageResources />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/experiences"
          element={
            <AdminRoute>
              <ManageExperiences />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/placements"
          element={
            <AdminRoute>
              <ManagePlacements />
            </AdminRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;