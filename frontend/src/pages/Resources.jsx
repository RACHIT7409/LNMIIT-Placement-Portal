import { useEffect, useMemo, useState } from "react";
import API from "../api/axios";
import Loader from "../components/Loader";

const Resources = () => {
  const [resources, setResources] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchResources = async () => {
    try {
      setLoading(true);
      setError("");

      const { data } = await API.get("/resources", {
        timeout: 30000,
      });

      setResources(data.resources || []);
    } catch (err) {
      if (err.code === "ECONNABORTED") {
        setError("Request timed out. Please refresh and try again.");
      } else {
        setError(err.response?.data?.message || "Failed to fetch resources");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResources();
  }, []);

  const categories = useMemo(() => {
    return [
      "All",
      ...new Set(
        resources.map((resource) => resource.category).filter(Boolean)
      ),
    ];
  }, [resources]);

  const filteredResources = resources.filter((resource) => {
    const matchesCategory =
      selectedCategory === "All" || resource.category === selectedCategory;

    const matchesSearch =
      resource.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.tags?.join(" ").toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.category?.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gradient-to-b from-blue-50 via-white to-gray-50">
      <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-6">
          Resources & Notes
        </h2>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-2xl px-4 py-3 mb-6">
            <p className="font-medium">{error}</p>
            <button
              onClick={fetchResources}
              className="mt-3 inline-block bg-red-600 text-white px-4 py-2 rounded-xl font-semibold hover:bg-red-700 transition"
            >
              Retry
            </button>
          </div>
        )}

        <div className="bg-white rounded-3xl shadow border p-4 mb-8 grid md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Search by title, category, description, or tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full border px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            {categories.map((category, idx) => (
              <option key={idx} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {loading ? (
          <Loader text="Loading resources... Please wait" />
        ) : filteredResources.length === 0 ? (
          <div className="bg-white rounded-3xl shadow border p-8 text-center">
            <p className="text-gray-600 text-lg">No matching resources found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource) => (
              <div
                key={resource._id}
                className="group bg-white shadow-md rounded-3xl border overflow-hidden hover:-translate-y-1 hover:shadow-xl hover:scale-[1.01] transition duration-300"
              >
                <div className="h-2 bg-gradient-to-r from-emerald-500 to-teal-500"></div>

                {resource.imageLink && (
                  <div className="w-full h-56 bg-gray-50 flex items-center justify-center border-b overflow-hidden">
                    <img
                      src={resource.imageLink}
                      alt={resource.title}
                      className="max-w-full max-h-full object-contain p-4 group-hover:scale-105 transition duration-500"
                    />
                  </div>
                )}

                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-blue-700 transition">
                    {resource.title}
                  </h3>

                  <p className="text-sm text-blue-700 font-medium mb-2">
                    {resource.category} • {resource.type}
                  </p>

                  <p className="text-gray-600 mb-4">
                    {resource.description || "No description available"}
                  </p>

                  {resource.tags?.length > 0 && (
                    <div className="mb-4 flex flex-wrap gap-2">
                      {resource.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full border hover:bg-blue-50 hover:text-blue-700 transition"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex gap-3 flex-wrap">
                    {resource.link && (
                      <a
                        href={resource.link}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-block bg-blue-700 text-white px-4 py-2 rounded-xl font-semibold hover:bg-blue-800 hover:scale-105 transition duration-300"
                      >
                        Open Link
                      </a>
                    )}

                    {resource.pdfLink && (
                      <a
                        href={resource.pdfLink}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-block bg-green-700 text-white px-4 py-2 rounded-xl font-semibold hover:bg-green-800 hover:scale-105 transition duration-300"
                      >
                        Open PDF
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Resources;