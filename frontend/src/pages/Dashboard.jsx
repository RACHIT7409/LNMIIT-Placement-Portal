const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const cards = [
 
    {
      title: "Resources",
      value: "Available",
      desc: "Browse categorized notes and useful placement preparation links.",
      gradient: "from-emerald-500 to-teal-500",
    },
    {
      title: "Interview Experiences",
      value: "Community Driven",
      desc: "Read approved interview experiences and share your own learning.",
      gradient: "from-pink-500 to-rose-500",
    },
  ];

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gradient-to-b from-blue-50 via-white to-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="mb-10">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-2">
            Welcome back, {user?.name || "Student"}
          </h2>
          <p className="text-gray-600 text-lg">
            Track your preparation, explore resources, and stay placement-ready.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {cards.map((card, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-3xl shadow-md border overflow-hidden hover:-translate-y-1 hover:shadow-xl hover:scale-[1.01] transition duration-300"
            >
              <div
                className={`h-2 w-full bg-gradient-to-r ${card.gradient}`}
              ></div>

              <div className="p-6">
                <p className="text-sm text-gray-500 mb-2">{card.title}</p>
                <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-700 transition mb-2">
                  {card.value}
                </h3>
                <p className="text-gray-600 leading-7">{card.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="group bg-white rounded-3xl shadow-md border p-6 hover:-translate-y-2 hover:shadow-2xl transition duration-300">
            <h3 className="text-2xl font-bold mb-4 group-hover:text-blue-700 transition">
              Quick Access
            </h3>
            <div className="space-y-3 text-gray-700">
              <p className="hover:translate-x-1 transition">• Track placement statistics</p>
              <p className="hover:translate-x-1 transition">• Explore company preparation pages</p>
              <p className="hover:translate-x-1 transition">• Browse resources and notes</p>
              <p className="hover:translate-x-1 transition">• Read and submit interview experiences</p>
            </div>
          </div>

          <div className="group bg-white rounded-3xl shadow-md border p-6 hover:-translate-y-2 hover:shadow-2xl transition duration-300">
            <h3 className="text-2xl font-bold mb-4 group-hover:text-blue-700 transition">
              Placement Focus
            </h3>
            <div className="space-y-3 text-gray-700">
              <p className="hover:translate-x-1 transition">• Company-specific preparation</p>
              <p className="hover:translate-x-1 transition">• Centralized study material</p>
              <p className="hover:translate-x-1 transition">• Real student experiences</p>
              <p className="hover:translate-x-1 transition">• Admin-managed content</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;