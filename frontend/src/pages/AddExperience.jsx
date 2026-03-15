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
      const { data } = await API.post("/experiences", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
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
      setError(err.response?.data?.message || "Failed to submit experience");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h2 className="text-3xl font-bold mb-6">Share Interview Experience</h2>

      {message && <p className="text-green-600 mb-4">{message}</p>}
      {error && <p className="text-red-600 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">
        <input
          type="text"
          name="company"
          placeholder="Company Name"
          value={formData.company}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
        />

        <input
          type="text"
          name="role"
          placeholder="Role (e.g. SDE Intern)"
          value={formData.role}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
        />

        <input
          type="text"
          name="rounds"
          placeholder="Rounds (comma separated)"
          value={formData.rounds}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
        />

        <textarea
          name="questionsAsked"
          placeholder="Questions asked (comma separated)"
          value={formData.questionsAsked}
          onChange={handleChange}
          rows="4"
          className="w-full border px-4 py-2 rounded"
        />

        <textarea
          name="tips"
          placeholder="Preparation tips"
          value={formData.tips}
          onChange={handleChange}
          rows="4"
          className="w-full border px-4 py-2 rounded"
        />

        <button
          type="submit"
          className="bg-blue-700 text-white px-6 py-2 rounded"
        >
          Submit Experience
        </button>
      </form>
    </div>
  );
};

export default AddExperience;