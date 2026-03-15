import { useEffect, useState } from "react";
import API from "../api/axios";

const initialForm = {
  notificationDate: "",
  companyName: "",
  typeOfOffer: "",
  branchAllowed: "",
  eligibilityCGPA: "",
  jobRole: "",
  ctc: "",
  stipend: "",
  placedStudents: "",
  status: "Pending",
};

const ManagePlacements = () => {
  const token = localStorage.getItem("token");

  const [placements, setPlacements] = useState([]);
  const [formData, setFormData] = useState(initialForm);
  const [editId, setEditId] = useState(null);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const fetchPlacements = async () => {
    try {
      const { data } = await API.get("/placements");
      setPlacements(data.placements || []);
    } catch (err) {
      console.error("Fetch placement error:", err.response?.data || err);
      setError("Failed to fetch placement entries");
    }
  };

  useEffect(() => {
    fetchPlacements();
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
    setMessage("");
    setError("");
  };

  const handleEdit = (placement) => {
    setEditId(placement._id);
    setMessage("");
    setError("");

    setFormData({
      notificationDate: placement.notificationDate || "",
      companyName: placement.companyName || "",
      typeOfOffer: placement.typeOfOffer || "",
      branchAllowed: placement.branchAllowed?.join(", ") || "",
      eligibilityCGPA: placement.eligibilityCGPA ?? "",
      jobRole: placement.jobRole || "",
      ctc: placement.ctc ?? "",
      stipend: placement.stipend || "",
      placedStudents: placement.placedStudents ?? "",
      status: placement.status || "Pending",
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    const payload = {
      notificationDate: formData.notificationDate,
      companyName: formData.companyName,
      typeOfOffer: formData.typeOfOffer,
      branchAllowed: formData.branchAllowed,
      eligibilityCGPA: formData.eligibilityCGPA,
      jobRole: formData.jobRole,
      ctc: formData.ctc,
      stipend: formData.stipend,
      placedStudents: formData.placedStudents,
      status: formData.status,
    };

    try {
      if (editId) {
        const { data } = await API.put(`/placements/${editId}`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessage(data.message || "Placement updated successfully");
      } else {
        const { data } = await API.post("/placements", payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessage(data.message || "Placement added successfully");
      }

      resetForm();
      fetchPlacements();
    } catch (err) {
      console.log("Placement save error:", err.response?.data || err);
      setError(
        err.response?.data?.error ||
          err.response?.data?.message ||
          "Failed to save placement"
      );
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/placements/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (editId === id) resetForm();
      fetchPlacements();
    } catch (err) {
      console.error("Delete placement error:", err.response?.data || err);
      setError(err.response?.data?.message || "Failed to delete placement");
    }
  };

  const getStatusBadge = (status) => {
    if (status === "Completed") return "bg-green-100 text-green-700";
    if (status === "Ongoing") return "bg-blue-100 text-blue-700";
    if (status === "Open") return "bg-yellow-100 text-yellow-700";
    return "bg-gray-100 text-gray-700";
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gradient-to-b from-blue-50 via-white to-gray-50">
      <div className="w-full px-4 md:px-6 lg:px-8 py-8">
        <h2 className="text-4xl font-extrabold mb-6">Manage Placement Tracker</h2>

        {message && <p className="text-green-600 mb-4">{message}</p>}
        {error && <p className="text-red-600 mb-4">{error}</p>}

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow rounded-3xl border p-5 grid grid-cols-1 md:grid-cols-2 gap-4 mb-8"
        >
          <input
            name="notificationDate"
            placeholder="Notification Date (example: 29/09/2025)"
            value={formData.notificationDate}
            onChange={handleChange}
            className="border px-4 py-3 rounded-xl"
          />

          <input
            name="companyName"
            placeholder="Company Name"
            value={formData.companyName}
            onChange={handleChange}
            className="border px-4 py-3 rounded-xl"
          />

          <input
            name="typeOfOffer"
            placeholder="Type of Offer (example: SLI + FTE)"
            value={formData.typeOfOffer}
            onChange={handleChange}
            className="border px-4 py-3 rounded-xl"
          />

          <input
            name="branchAllowed"
            placeholder="Branch Allowed (comma separated)"
            value={formData.branchAllowed}
            onChange={handleChange}
            className="border px-4 py-3 rounded-xl"
          />

          <input
            name="eligibilityCGPA"
            placeholder="Eligibility CGPA (example: 6.5)"
            value={formData.eligibilityCGPA}
            onChange={handleChange}
            className="border px-4 py-3 rounded-xl"
          />

          <input
            name="jobRole"
            placeholder="Job Role"
            value={formData.jobRole}
            onChange={handleChange}
            className="border px-4 py-3 rounded-xl"
          />

          <input
            name="ctc"
            placeholder="CTC in LPA (example: 7 or 12.5)"
            value={formData.ctc}
            onChange={handleChange}
            className="border px-4 py-3 rounded-xl"
          />

          <input
            name="stipend"
            placeholder="Stipend text (example: ₹15,000)"
            value={formData.stipend}
            onChange={handleChange}
            className="border px-4 py-3 rounded-xl"
          />

          <input
            name="placedStudents"
            placeholder="Placed Students (example: 8)"
            value={formData.placedStudents}
            onChange={handleChange}
            className="border px-4 py-3 rounded-xl"
          />

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="border px-4 py-3 rounded-xl"
          >
            <option value="Pending">Pending</option>
            <option value="Open">Open</option>
            <option value="Ongoing">Ongoing</option>
            <option value="Completed">Completed</option>
          </select>

          <div className="md:col-span-2 flex gap-3 flex-wrap">
            <button
              type="submit"
              className="bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-800 transition"
            >
              {editId ? "Update Entry" : "Add Entry"}
            </button>

            {editId && (
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-600 transition"
              >
                Cancel Edit
              </button>
            )}
          </div>
        </form>

        <div className="bg-white rounded-3xl shadow border w-full overflow-hidden">
          <div className="w-full">
            <table className="w-full table-fixed">
              <thead className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                <tr className="text-sm md:text-base">
                  <th className="px-2 py-4 w-[5%] text-left">S.No</th>
                  <th className="px-2 py-4 w-[10%] text-left">Notification Date</th>
                  <th className="px-2 py-4 w-[12%] text-left">Company Name</th>
                  <th className="px-2 py-4 w-[8%] text-left">Type of Offer</th>
                  <th className="px-2 py-4 w-[12%] text-left">Branch Allowed</th>
                  <th className="px-2 py-4 w-[8%] text-left">Eligibility CGPA</th>
                  <th className="px-2 py-4 w-[12%] text-left">Job Role</th>
                  <th className="px-2 py-4 w-[6%] text-left">CTC</th>
                  <th className="px-2 py-4 w-[8%] text-left">Stipend</th>
                  <th className="px-2 py-4 w-[7%] text-left">Placed Students</th>
                  <th className="px-2 py-4 w-[7%] text-left">Status</th>
                  <th className="px-2 py-4 w-[10%] text-left">Actions</th>
                </tr>
              </thead>

              <tbody>
                {placements.length === 0 ? (
                  <tr>
                    <td colSpan="12" className="px-4 py-8 text-center text-gray-500">
                      No placement entries found.
                    </td>
                  </tr>
                ) : (
                  placements.map((placement, index) => (
                    <tr
                      key={placement._id}
                      className="border-b hover:bg-blue-50 transition text-sm md:text-base align-top"
                    >
                      <td className="px-2 py-5 break-words">{index + 1}</td>

                      <td className="px-2 py-5 break-words">
                        {placement.notificationDate || "-"}
                      </td>

                      <td className="px-2 py-5 font-semibold break-words">
                        {placement.companyName}
                      </td>

                      <td className="px-2 py-5 break-words">
                        {placement.typeOfOffer || "-"}
                      </td>

                      <td className="px-2 py-5 break-words">
                        {placement.branchAllowed?.length > 0
                          ? placement.branchAllowed.join(", ")
                          : "-"}
                      </td>

                      <td className="px-2 py-5 break-words">
                        {placement.eligibilityCGPA || "-"}
                      </td>

                      <td className="px-2 py-5 break-words">
                        {placement.jobRole || "-"}
                      </td>

                      <td className="px-2 py-5 font-semibold text-green-600 break-words">
                        {placement.ctc ? `${placement.ctc} LPA` : "-"}
                      </td>

                      <td className="px-2 py-5 break-words">
                        {placement.stipend || "-"}
                      </td>

                      <td className="px-2 py-5 break-words">
                        {placement.placedStudents ?? 0}
                      </td>

                      <td className="px-2 py-5 break-words">
                        <span
                          className={`px-2 py-1 rounded-full text-xs md:text-sm font-semibold inline-block ${getStatusBadge(
                            placement.status
                          )}`}
                        >
                          {placement.status}
                        </span>
                      </td>

                      <td className="px-2 py-5">
                        <div className="flex flex-col gap-2">
                          <button
                            onClick={() => handleEdit(placement)}
                            className="bg-yellow-500 text-white px-3 py-2 rounded-lg hover:bg-yellow-600 transition text-sm"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(placement._id)}
                            className="bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700 transition text-sm"
                          >
                            Delete
                          </button>
                        </div>
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

export default ManagePlacements;