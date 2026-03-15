import { useEffect, useState } from "react";
import API from "../api/axios";

const ManageResources = () => {
  const token = localStorage.getItem("token");

  const initialForm = {
    title: "",
    category: "",
    type: "",
    link: "",
    pdfLink: "",
    imageLink: "",
    description: "",
    tags: "",
  };

  const [resources, setResources] = useState([]);
  const [formData, setFormData] = useState(initialForm);
  const [editId, setEditId] = useState(null);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const fetchResources = async () => {
    try {
      const { data } = await API.get("/resources");
      setResources(data.resources || []);
    } catch {
      setError("Failed to fetch resources");
    }
  };

  useEffect(() => {
    fetchResources();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const resetForm = () => {
    setFormData(initialForm);
    setEditId(null);
  };

  const handleEdit = (resource) => {
    setEditId(resource._id);
    setMessage("");
    setError("");

    setFormData({
      title: resource.title || "",
      category: resource.category || "",
      type: resource.type || "",
      link: resource.link || "",
      pdfLink: resource.pdfLink || "",
      imageLink: resource.imageLink || "",
      description: resource.description || "",
      tags: resource.tags?.join(", ") || "",
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      if (editId) {
        const { data } = await API.put(`/resources/${editId}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMessage(data.message || "Resource updated successfully");
      } else {
        const { data } = await API.post("/resources", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMessage(data.message || "Resource added successfully");
      }

      resetForm();
      fetchResources();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save resource");
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/resources/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (editId === id) {
        resetForm();
      }

      fetchResources();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete resource");
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gray-50">
      <div className="max-w-6xl mx-auto p-8">
        <h2 className="text-4xl font-extrabold mb-6">Manage Resources</h2>

        {message && <p className="text-green-600 mb-4">{message}</p>}
        {error && <p className="text-red-600 mb-4">{error}</p>}

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow rounded-2xl border p-6 space-y-4 mb-8"
        >
          <h3 className="text-2xl font-bold">
            {editId ? "Edit Resource" : "Add Resource"}
          </h3>

          <input
            name="title"
            placeholder="Resource Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border px-4 py-3 rounded-lg"
          />

          <input
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border px-4 py-3 rounded-lg"
          />

          <input
            name="type"
            placeholder="Type"
            value={formData.type}
            onChange={handleChange}
            className="w-full border px-4 py-3 rounded-lg"
          />

          <input
            name="link"
            placeholder="General Link"
            value={formData.link}
            onChange={handleChange}
            className="w-full border px-4 py-3 rounded-lg"
          />

          <input
            name="pdfLink"
            placeholder="PDF Link"
            value={formData.pdfLink}
            onChange={handleChange}
            className="w-full border px-4 py-3 rounded-lg"
          />

          <input
            name="imageLink"
            placeholder="Card Image URL"
            value={formData.imageLink}
            onChange={handleChange}
            className="w-full border px-4 py-3 rounded-lg"
          />

          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border px-4 py-3 rounded-lg"
          />

          <input
            name="tags"
            placeholder="Tags (comma separated)"
            value={formData.tags}
            onChange={handleChange}
            className="w-full border px-4 py-3 rounded-lg"
          />

          <div className="flex gap-3 flex-wrap">
            <button
              type="submit"
              className="bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition"
            >
              {editId ? "Update Resource" : "Add Resource"}
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
          {resources.map((resource) => (
            <div
              key={resource._id}
              className="bg-white shadow rounded-2xl border p-6"
            >
              {resource.imageLink && (
                <div className="w-full h-56 bg-gray-50 rounded-xl mb-4 flex items-center justify-center border overflow-hidden">
  <img
    src={resource.imageLink}
    alt={resource.title}
    className="max-w-full max-h-full object-contain p-3"
  />
</div>
              )}

              <h3 className="text-xl font-semibold">{resource.title}</h3>
              <p className="text-gray-600 mt-2">
                {resource.category} • {resource.type}
              </p>
              <p className="text-gray-600 mt-2 mb-3">{resource.description}</p>

              <div className="flex gap-3 flex-wrap mb-4">
                {resource.link && (
                  <a
                    href={resource.link}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-blue-700 text-white px-4 py-2 rounded-lg"
                  >
                    Open Link
                  </a>
                )}

                {resource.pdfLink && (
                  <a
                    href={resource.pdfLink}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-green-700 text-white px-4 py-2 rounded-lg"
                  >
                    Open PDF
                  </a>
                )}
              </div>

              <div className="flex gap-3 flex-wrap">
                <button
                  onClick={() => handleEdit(resource)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-yellow-600 transition"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(resource._id)}
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

export default ManageResources;