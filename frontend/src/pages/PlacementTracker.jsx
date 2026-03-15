import { useEffect, useMemo, useState } from "react";
import API from "../api/axios";

const PlacementTracker = () => {
  const [placements, setPlacements] = useState([]);
  const [stats, setStats] = useState({
    totalCompanies: 0,
    averageCTC: 0,
    medianCTC: 0,
    averageStipend: 0,
    medianStipend: 0,
    totalStudentsPlaced: 0,
    openRoles: 0,
    completedCompanies: 0,
    pendingCompanies: 0,
    totalStudents: 490,
    placementRate: 0,
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortOption, setSortOption] = useState("ctcHighToLow");
  const [error, setError] = useState("");

  const fetchPlacements = async () => {
    try {
      const { data } = await API.get("/placements");
      setPlacements(data.placements || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch placements");
    }
  };

  const fetchStats = async () => {
    try {
      const { data } = await API.get("/placements/stats");
      setStats(data.stats);
    } catch (err) {
      console.error("Failed to fetch placement stats", err);
    }
  };

  useEffect(() => {
    fetchPlacements();
    fetchStats();
  }, []);

  const filteredPlacements = useMemo(() => {
    let filtered = placements.filter((placement) => {
      const matchesSearch =
        placement.companyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        placement.jobRole?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        placement.typeOfOffer?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || placement.status === statusFilter;

      return matchesSearch && matchesStatus;
    });

    filtered.sort((a, b) => {
      if (sortOption === "ctcHighToLow") {
        return (b.ctc || 0) - (a.ctc || 0);
      }

      if (sortOption === "ctcLowToHigh") {
        return (a.ctc || 0) - (b.ctc || 0);
      }

      if (sortOption === "studentsPlaced") {
        return (b.placedStudents || 0) - (a.placedStudents || 0);
      }

      if (sortOption === "companyName") {
        return (a.companyName || "").localeCompare(b.companyName || "");
      }

      return 0;
    });

    return filtered;
  }, [placements, searchTerm, statusFilter, sortOption]);

  const getStatusBadge = (status) => {
    if (status === "Completed") return "bg-green-100 text-green-700";
    if (status === "Ongoing") return "bg-blue-100 text-blue-700";
    if (status === "Open") return "bg-yellow-100 text-yellow-700";
    return "bg-gray-100 text-gray-700";
  };

  const topCards = [
    {
      title: "Total Companies",
      value: stats.totalCompanies,
    },
    {
      title: "Average CTC",
      value: `${stats.averageCTC} LPA`,
    },
    {
      title: "Median CTC",
      value: `${stats.medianCTC} LPA`,
    },
    {
      title: "Average Stipend",
      value: `₹${(stats.averageStipend / 1000).toFixed(1)}K`,
    },
    {
      title: "Median Stipend",
      value: `₹${(stats.medianStipend / 1000).toFixed(1)}K`,
    },
    {
      title: "Students Placed",
      value: `${stats.totalStudentsPlaced} / ${stats.totalStudents}`,
    },
    {
      title: "Placement Rate",
      value: `${stats.placementRate}%`,
    },
  ];

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50">
      <div className="w-full px-4 md:px-6 lg:px-8 py-10">
        <div className="text-center mb-10 text-gray-800">
          <h1 className="text-5xl font-extrabold mb-3">🎓 Placement Tracker 2026</h1>
          <p className="text-2xl text-gray-500">LNMIIT Jaipur</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-5 mb-10">
          {topCards.map((card, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl shadow-xl p-6 min-h-[170px] flex flex-col justify-between"
            >
              <p className="text-sm uppercase tracking-wide text-gray-500 font-medium">
                {card.title}
              </p>
              <h3 className="text-4xl font-extrabold text-indigo-500 mt-4 break-words">
                {card.value}
              </h3>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-3xl shadow border p-4 mb-6 grid grid-cols-1 lg:grid-cols-[1.6fr_0.5fr_0.7fr] gap-4">
          <input
            type="text"
            placeholder="Search by company name, job role, or offer type..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border px-4 py-3 rounded-xl"
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full border px-4 py-3 rounded-xl"
          >
            <option value="All">All Status</option>
            <option value="Open">Open</option>
            <option value="Ongoing">Ongoing</option>
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
          </select>

          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="w-full border px-4 py-3 rounded-xl"
          >
            <option value="ctcHighToLow">Sort by CTC (High to Low)</option>
            <option value="ctcLowToHigh">Sort by CTC (Low to High)</option>
            <option value="studentsPlaced">Sort by Students Placed</option>
            <option value="companyName">Sort by Company Name</option>
          </select>
        </div>

        {error && <p className="text-red-600 mb-4">{error}</p>}

        <div className="bg-white rounded-3xl shadow border overflow-hidden">
          <div className="w-full overflow-x-auto">
            <table className="w-full min-w-[1200px]">
              <thead className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                <tr className="text-sm md:text-base">
                  <th className="px-4 py-4 text-left whitespace-nowrap">S.No</th>
                  <th className="px-4 py-4 text-left whitespace-nowrap">Notification Date</th>
                  <th className="px-4 py-4 text-left whitespace-nowrap">Company Name</th>
                  <th className="px-4 py-4 text-left whitespace-nowrap">Type of Offer</th>
                  <th className="px-4 py-4 text-left whitespace-nowrap">Branch Allowed</th>
                  <th className="px-4 py-4 text-left whitespace-nowrap">Eligibility CGPA</th>
                  <th className="px-4 py-4 text-left whitespace-nowrap">Job Role</th>
                  <th className="px-4 py-4 text-left whitespace-nowrap">CTC</th>
                  <th className="px-4 py-4 text-left whitespace-nowrap">Stipend</th>
                  <th className="px-4 py-4 text-left whitespace-nowrap">Placed Students</th>
                  <th className="px-4 py-4 text-left whitespace-nowrap">Status</th>
                </tr>
              </thead>

              <tbody>
                {filteredPlacements.length === 0 ? (
                  <tr>
                    <td colSpan="11" className="px-4 py-8 text-center text-gray-500">
                      No placement entries found.
                    </td>
                  </tr>
                ) : (
                  filteredPlacements.map((placement, index) => (
                    <tr
                      key={placement._id}
                      className="border-b hover:bg-blue-50 transition text-sm md:text-base"
                    >
                      <td className="px-4 py-5">{index + 1}</td>

                      <td className="px-4 py-5 whitespace-nowrap">
                        {placement.notificationDate || "-"}
                      </td>

                      <td className="px-4 py-5 font-semibold">
                        {placement.companyName}
                      </td>

                      <td className="px-4 py-5">
                        {placement.typeOfOffer || "-"}
                      </td>

                      <td className="px-4 py-5">
                        {placement.branchAllowed?.length > 0
                          ? placement.branchAllowed.join(", ")
                          : "-"}
                      </td>

                      <td className="px-4 py-5">
                        {placement.eligibilityCGPA || "-"}
                      </td>

                      <td className="px-4 py-5">
                        {placement.jobRole || "-"}
                      </td>

                      <td className="px-4 py-5 font-semibold text-green-600 whitespace-nowrap">
                        {placement.ctc ? `${placement.ctc} LPA` : "-"}
                      </td>

                      <td className="px-4 py-5 whitespace-nowrap">
                        {placement.stipend || "-"}
                      </td>

                      <td className="px-4 py-5">
                        {placement.placedStudents ?? 0}
                      </td>

                      <td className="px-4 py-5">
                        <span
                          className={`px-3 py-1 rounded-full text-xs md:text-sm font-semibold inline-block ${getStatusBadge(
                            placement.status
                          )}`}
                        >
                          {placement.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlacementTracker;