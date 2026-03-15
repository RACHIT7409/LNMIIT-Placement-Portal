import { useEffect, useState } from "react";
import API from "../api/axios";

const emptyQuestion = {
  title: "",
  difficulty: "",
  topic: "",
  problemLink: "",
};

const ManageCompanies = () => {
  const token = localStorage.getItem("token");

  const initialForm = {
    name: "",
    logo: "",
    questions: [{ ...emptyQuestion }],
  };

  const [companies, setCompanies] = useState([]);
  const [formData, setFormData] = useState(initialForm);
  const [editId, setEditId] = useState(null);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const fetchCompanies = async () => {
    try {
      const { data } = await API.get("/companies");
      setCompanies(data.companies || []);
    } catch {
      setError("Failed to fetch companies");
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const resetForm = () => {
    setFormData(initialForm);
    setEditId(null);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...formData.questions];
    updatedQuestions[index][field] = value;
    setFormData((prev) => ({
      ...prev,
      questions: updatedQuestions,
    }));
  };

  const addQuestionPanel = () => {
    setFormData((prev) => ({
      ...prev,
      questions: [...prev.questions, { ...emptyQuestion }],
    }));
  };

  const removeQuestionPanel = (index) => {
    if (formData.questions.length === 1) return;

    const updatedQuestions = formData.questions.filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      questions: updatedQuestions,
    }));
  };

  const handleEdit = (company) => {
    setEditId(company._id);
    setMessage("");
    setError("");

    setFormData({
      name: company.name || "",
      logo: company.logo || "",
      questions:
        company.questions?.length > 0
          ? company.questions.map((q) => ({
              title: q.title || "",
              difficulty: q.difficulty || "",
              topic: q.topic || "",
              problemLink: q.problemLink || "",
            }))
          : [{ ...emptyQuestion }],
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    const cleanedQuestions = formData.questions.filter(
      (q) => q.title.trim() !== ""
    );

    const payload = {
      name: formData.name,
      logo: formData.logo,
      questions: cleanedQuestions,
    };

    try {
      if (editId) {
        const { data } = await API.put(`/companies/${editId}`, payload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMessage(data.message || "Company updated successfully");
      } else {
        const { data } = await API.post("/companies", payload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMessage(data.message || "Company added successfully");
      }

      resetForm();
      fetchCompanies();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save company");
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/companies/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (editId === id) resetForm();
      fetchCompanies();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete company");
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gray-50">
      <div className="max-w-6xl mx-auto p-8">
        <h2 className="text-4xl font-extrabold mb-6">Manage Companies</h2>

        {message && <p className="text-green-600 mb-4">{message}</p>}
        {error && <p className="text-red-600 mb-4">{error}</p>}

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow rounded-2xl border p-6 space-y-6 mb-8"
        >
          <h3 className="text-2xl font-bold">
            {editId ? "Edit Company" : "Add Company"}
          </h3>

          <input
            name="name"
            placeholder="Company Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border px-4 py-3 rounded-lg"
          />

          <input
            name="logo"
            placeholder="Company Logo Image URL"
            value={formData.logo}
            onChange={handleChange}
            className="w-full border px-4 py-3 rounded-lg"
          />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xl font-semibold">Questions</h4>
              <button
                type="button"
                onClick={addQuestionPanel}
                className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition"
              >
                Add More Question
              </button>
            </div>

            {formData.questions.map((question, index) => (
              <div
                key={index}
                className="border rounded-xl p-4 bg-gray-50 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <h5 className="font-semibold">Question {index + 1}</h5>
                  {formData.questions.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeQuestionPanel(index)}
                      className="text-red-600 font-medium"
                    >
                      Remove
                    </button>
                  )}
                </div>

                <input
                  type="text"
                  placeholder="Question Title"
                  value={question.title}
                  onChange={(e) =>
                    handleQuestionChange(index, "title", e.target.value)
                  }
                  className="w-full border px-4 py-3 rounded-lg"
                />

                <select
                  value={question.difficulty}
                  onChange={(e) =>
                    handleQuestionChange(index, "difficulty", e.target.value)
                  }
                  className="w-full border px-4 py-3 rounded-lg"
                >
                  <option value="">Select Difficulty</option>
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>

                <input
                  type="text"
                  placeholder="Topic"
                  value={question.topic}
                  onChange={(e) =>
                    handleQuestionChange(index, "topic", e.target.value)
                  }
                  className="w-full border px-4 py-3 rounded-lg"
                />

                <input
                  type="text"
                  placeholder="Problem Link"
                  value={question.problemLink}
                  onChange={(e) =>
                    handleQuestionChange(index, "problemLink", e.target.value)
                  }
                  className="w-full border px-4 py-3 rounded-lg"
                />
              </div>
            ))}
          </div>

          <div className="flex gap-3 flex-wrap">
            <button
              type="submit"
              className="bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition"
            >
              {editId ? "Update Company" : "Add Company"}
            </button>

            {editId && (
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-600 transition"
              >
                Cancel Edit
              </button>
            )}
          </div>
        </form>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {companies.map((company) => (
            <div
              key={company._id}
              className="bg-white shadow rounded-2xl border p-6"
            >
              {company.logo && (
                <div className="w-full h-48 bg-gray-50 rounded-xl mb-4 flex items-center justify-center border overflow-hidden">
                  <img
                    src={company.logo}
                    alt={company.name}
                    className="max-w-full max-h-full object-contain p-3"
                  />
                </div>
              )}

              <h3 className="text-2xl font-bold">{company.name}</h3>
              <p className="text-sm text-blue-700 font-medium mt-3 mb-4">
                Questions: {company.questions?.length || 0}
              </p>

              <div className="flex gap-3 flex-wrap">
                <button
                  onClick={() => handleEdit(company)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-yellow-600 transition"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(company._id)}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageCompanies;