import { useEffect, useState } from "react";
import API from "../api/axios";

const ManageExperiences = () => {
  const token = localStorage.getItem("token");

  const [experiences, setExperiences] = useState([]);
  const [error, setError] = useState("");

  const fetchExperiences = async () => {
    try {
      const { data } = await API.get("/experiences/admin/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setExperiences(data.experiences || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch experiences");
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await API.put(
        `/experiences/${id}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchExperiences();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update status");
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/experiences/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchExperiences();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete experience");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-8">
      <h2 className="text-3xl font-bold mb-6">Manage Interview Experiences</h2>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      <div className="grid grid-cols-1 gap-6">
        {experiences.map((exp) => (
          <div key={exp._id} className="bg-white shadow rounded p-5">
            <h3 className="text-xl font-semibold mb-2">
              {exp.company} — {exp.role}
            </h3>

            <p className="text-sm text-gray-500 mb-2">
              User: {exp.user?.name || "Unknown"} | Status: {exp.status}
            </p>

            <p className="mb-2"><span className="font-semibold">Rounds:</span> {exp.rounds?.join(", ")}</p>
            <p className="mb-2"><span className="font-semibold">Questions:</span> {exp.questionsAsked?.join(", ")}</p>
            <p className="mb-4"><span className="font-semibold">Tips:</span> {exp.tips}</p>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => updateStatus(exp._id, "approved")}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Approve
              </button>

              <button
                onClick={() => updateStatus(exp._id, "rejected")}
                className="bg-yellow-600 text-white px-4 py-2 rounded"
              >
                Reject
              </button>

              <button
                onClick={() => handleDelete(exp._id)}
                className="bg-red-600 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageExperiences;