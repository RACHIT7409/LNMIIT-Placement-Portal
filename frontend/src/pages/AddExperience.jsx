import { useState } from "react";
import API from "../api/axios";

const AddExperience = () => {
  const [formData, setFormData] = useState({
    company: "",
    role: "",
    rounds: "",
    questionsAsked: "",
    tips: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      setSubmitting(true);

      const { data } = await API.post("/experiences", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        timeout: 30000,
      });

      setMessage(data.message || "Experience submitted successfully");
      setFormData({
        company: "",
        role: "",
        rounds: "",
        questionsAsked: "",
        tips: "",
      });
    } catch (err) {
      if (err.code === "ECONNABORTED") {
        setError("Request timed out. Please try again.");
      } else {
        setError(err.response?.data?.message || "Failed to submit experience");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gradient-to-b from-blue-50 via-white to-gray-50">
      <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6">
          Share Interview Experience
        </h2>

        {message && (
          <div className="bg-green-50 border border-green-200 text-green-700 rounded-2xl px-4 py-3 mb-4">
            {message}
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-2xl px-4 py-3 mb-4">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-4 bg-white p-6 rounded-3xl shadow border"
        >
          <input
            type="text"
            name="company"
            placeholder="Company Name"
            value={formData.company}
            onChange={handleChange}
            className="w-full border px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="text"
            name="role"
            placeholder="Role (e.g. SDE Intern)"
            value={formData.role}
            onChange={handleChange}
            className="w-full border px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="text"
            name="rounds"
            placeholder="Rounds (comma separated)"
            value={formData.rounds}
            onChange={handleChange}
            className="w-full border px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <textarea
            name="questionsAsked"
            placeholder="Questions asked (comma separated)"
            value={formData.questionsAsked}
            onChange={handleChange}
            rows="4"
            className="w-full border px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <textarea
            name="tips"
            placeholder="Preparation tips"
            value={formData.tips}
            onChange={handleChange}
            rows="4"
            className="w-full border px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button
            type="submit"
            disabled={submitting}
            className={`w-full sm:w-auto px-6 py-3 rounded-xl font-semibold text-white transition ${
              submitting
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-700 hover:bg-blue-800"
            }`}
          >
            {submitting ? "Submitting..." : "Submit Experience"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddExperience;