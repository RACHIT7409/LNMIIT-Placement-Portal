import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";

const CompanyDetails = () => {
  const { id } = useParams();
  const [company, setCompany] = useState(null);
  const [error, setError] = useState("");

  const [difficultyFilter, setDifficultyFilter] = useState("All");
  const [topicFilter, setTopicFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const fetchCompany = async () => {
    try {
      const { data } = await API.get(`/companies/${id}`);
      setCompany(data.company);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch company details");
    }
  };

  useEffect(() => {
    fetchCompany();
  }, [id]);

  const questions = company?.questions || [];

  const topics = useMemo(() => {
    return ["All", ...new Set(questions.map((q) => q.topic).filter(Boolean))];
  }, [questions]);

  const filteredQuestions = questions.filter((q) => {
    const matchesDifficulty =
      difficultyFilter === "All" || q.difficulty === difficultyFilter;

    const matchesTopic =
      topicFilter === "All" || q.topic === topicFilter;

    const matchesSearch =
      q.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.topic?.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesDifficulty && matchesTopic && matchesSearch;
  });

  if (error) {
    return <div className="p-8 text-red-600">{error}</div>;
  }

  if (!company) {
    return <div className="p-8">Loading company details...</div>;
  }

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gray-50">
      <div className="max-w-7xl mx-auto p-8">
        <div className="grid md:grid-cols-[180px_1fr] gap-8 items-start mb-10">
          <div className="bg-white rounded-2xl border shadow p-4 flex items-center justify-center min-h-40">
            {company.logo ? (
              <img
                src={company.logo}
                alt={company.name}
                className="max-w-full h-28 object-contain"
              />
            ) : (
              <div className="text-3xl font-bold text-gray-500">
                {company.name?.charAt(0)}
              </div>
            )}
          </div>

          <div>
            <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
              {company.name}
            </h1>
            <p className="text-sm text-gray-500">
              {questions.length} question{questions.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow border p-4 mb-8 grid md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Search by question title or topic..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border px-4 py-3 rounded-lg"
          />

          <select
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value)}
            className="w-full border px-4 py-3 rounded-lg"
          >
            <option value="All">All Difficulties</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>

          <select
            value={topicFilter}
            onChange={(e) => setTopicFilter(e.target.value)}
            className="w-full border px-4 py-3 rounded-lg"
          >
            {topics.map((topic, idx) => (
              <option key={idx} value={topic}>
                {topic === "All" ? "All Topics" : topic}
              </option>
            ))}
          </select>
        </div>

        {filteredQuestions.length === 0 ? (
          <p className="text-gray-600">No matching questions found.</p>
        ) : (
          <div className="space-y-6">
            {filteredQuestions.map((q, index) => (
              <div
                key={index}
                className="bg-white border shadow rounded-2xl p-6"
              >
                <div className="flex flex-wrap gap-3 mb-4">
                  {q.difficulty && (
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium border ${
                        q.difficulty === "Easy"
                          ? "bg-green-50 text-green-700 border-green-200"
                          : q.difficulty === "Medium"
                          ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                          : "bg-red-50 text-red-700 border-red-200"
                      }`}
                    >
                      {q.difficulty}
                    </span>
                  )}

                  {q.topic && (
                    <span className="px-3 py-1 rounded-full text-sm border text-gray-700 bg-gray-50">
                      {q.topic}
                    </span>
                  )}
                </div>

                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  {q.title}
                </h3>

                {q.problemLink && (
                  <a
                    href={q.problemLink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block bg-blue-700 text-white px-5 py-2 rounded-lg font-semibold hover:bg-blue-800 transition"
                  >
                    Solve Problem
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyDetails;