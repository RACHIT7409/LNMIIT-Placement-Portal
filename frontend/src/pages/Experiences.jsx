import { useEffect, useMemo, useState } from "react";
import API from "../api/axios";
import Loader from "../components/Loader";

const Experiences = () => {
  const [experiences, setExperiences] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchExperiences = async () => {
    try {
      setLoading(true);
      setError("");

      const { data } = await API.get("/experiences", {
        timeout: 30000,
      });

      setExperiences(data.experiences || []);
    } catch (err) {
      if (err.code === "ECONNABORTED") {
        setError("Request timed out. Please refresh and try again.");
      } else {
        setError(
          err.response?.data?.message || "Failed to fetch interview experiences"
        );
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  const companyOptions = useMemo(() => {
    return [
      "All",
      ...new Set(experiences.map((exp) => exp.company).filter(Boolean)),
    ];
  }, [experiences]);

  const filteredExperiences = experiences.filter((exp) => {
    const matchesCompany =
      selectedCompany === "All" || exp.company === selectedCompany;

    const matchesSearch =
      exp.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exp.role?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exp.rounds?.join(" ").toLowerCase().includes(searchTerm.toLowerCase()) ||
      exp.questionsAsked
        ?.join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      exp.tips?.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCompany && matchesSearch;
  });

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gray-50">
      <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-6">
          Interview Experiences
        </h2>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-2xl px-4 py-3 mb-6">
            <p className="font-medium">{error}</p>
            <button
              onClick={fetchExperiences}
              className="mt-3 inline-block bg-red-600 text-white px-4 py-2 rounded-xl font-semibold hover:bg-red-700 transition"
            >
              Retry
            </button>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow border p-4 mb-8 grid md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Search by company, role, questions, rounds, or tips..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <select
            value={selectedCompany}
            onChange={(e) => setSelectedCompany(e.target.value)}
            className="w-full border px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            {companyOptions.map((company, idx) => (
              <option key={idx} value={company}>
                {company}
              </option>
            ))}
          </select>
        </div>

        {loading ? (
          <Loader text="Loading interview experiences... Please wait" />
        ) : filteredExperiences.length === 0 ? (
          <div className="bg-white rounded-2xl shadow border p-8 text-center">
            <p className="text-gray-600 text-lg">
              No matching interview experiences found.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {filteredExperiences.map((exp) => (
              <div
                key={exp._id}
                className="bg-white shadow rounded-2xl border p-6"
              >
                <h3 className="text-2xl font-bold mb-2">
                  {exp.company} — {exp.role}
                </h3>

                <p className="text-sm text-gray-500 mb-4">
                  Shared by: {exp.user?.name || "Anonymous"}
                </p>

                <div className="mb-3">
                  <h4 className="font-semibold text-lg">Rounds</h4>
                  <p className="text-gray-700">
                    {exp.rounds?.join(", ") || "Not specified"}
                  </p>
                </div>

                <div className="mb-3">
                  <h4 className="font-semibold text-lg">Questions Asked</h4>
                  <p className="text-gray-700">
                    {exp.questionsAsked?.join(", ") || "Not specified"}
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-lg">Tips</h4>
                  <p className="text-gray-700">
                    {exp.tips || "No tips provided"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Experiences;