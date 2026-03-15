import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const cards = [
    {
      title: "Manage Companies",
      desc: "Add and update company pages with company-wise questions and links.",
      link: "/admin/companies",
      gradient: "from-blue-500 to-indigo-500",
    },
    {
      title: "Manage Resources",
      desc: "Add notes, PDFs, card images, and subject-wise preparation material.",
      link: "/admin/resources",
      gradient: "from-emerald-500 to-teal-500",
    },
    {
  title: "Manage Placement Tracker",
  desc: "Add, update, and maintain placement season records and status.",
  link: "/admin/placements",
  gradient: "from-violet-500 to-purple-500",
},
    {
      title: "Manage Experiences",
      desc: "Approve, reject, and manage interview experiences shared by students.",
      link: "/admin/experiences",
      gradient: "from-pink-500 to-rose-500",
    },
  ];

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gradient-to-b from-blue-50 via-white to-gray-50">
      <div className="max-w-6xl mx-auto p-8">
        <h2 className="text-4xl font-extrabold mb-3">Admin Dashboard</h2>
        <p className="text-gray-600 mb-8 text-lg">
          Welcome, {user?.name}. Manage companies, resources, and interview experiences here.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <Link
              key={index}
              to={card.link}
              className="group relative bg-white rounded-3xl shadow-md border overflow-hidden hover:-translate-y-1 hover:shadow-xl hover:scale-[1.01] transition duration-300"
            >
              <div className={`h-2 bg-gradient-to-r ${card.gradient}`}></div>

              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-700 transition">
                  {card.title}
                </h3>
                <p className="text-gray-600 leading-7">{card.desc}</p>

                <div className="mt-6 inline-block text-blue-700 font-semibold group-hover:translate-x-1 transition">
                  Open →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;