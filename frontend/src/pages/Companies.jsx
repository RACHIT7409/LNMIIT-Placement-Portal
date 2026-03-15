import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";

const Companies = () => {
  const [companies, setCompanies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");

  const fetchCompanies = async () => {
    try {
      const { data } = await API.get("/companies");
      setCompanies(data.companies || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch companies");
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const filteredCompanies = companies.filter((company) =>
    company.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gradient-to-b from-blue-50 via-white to-gray-50">
      <div className="max-w-6xl mx-auto p-8">
        <h2 className="text-4xl font-extrabold mb-6">Company Wise Questions</h2>

        {error && <p className="text-red-600 mb-4">{error}</p>}

        <div className="bg-white rounded-3xl shadow border p-4 mb-8">
          <input
            type="text"
            placeholder="Search by company name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {filteredCompanies.length === 0 ? (
          <p className="text-gray-600">No matching companies found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCompanies.map((company) => (
              <div
                key={company._id}
               className="group bg-white shadow-md rounded-3xl border overflow-hidden hover:-translate-y-1 hover:shadow-xl hover:scale-[1.01] transition duration-300"
              >
                <div className="h-2 bg-gradient-to-r from-blue-500 to-indigo-500"></div>

                {company.logo && (
                  <div className="w-full h-52 bg-gray-50 flex items-center justify-center border-b overflow-hidden">
                    <img
                      src={company.logo}
                      alt={company.name}
                      className="max-w-full max-h-full object-contain p-4 group-hover:scale-105 transition duration-500"
                    />
                  </div>
                )}

                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-blue-700 transition">
                    {company.name}
                  </h3>

                  <p className="text-sm text-gray-600 mb-5">
                    Total Questions: {company.questions?.length || 0}
                  </p>

                  <Link
                    to={`/companies/${company._id}`}
                    className="inline-block bg-blue-700 text-white px-5 py-2 rounded-xl font-semibold hover:bg-blue-800 hover:scale-105 transition duration-300"
                  >
                    Solve Questions
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Companies;