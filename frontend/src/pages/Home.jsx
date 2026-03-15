import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api/axios";

const Home = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [stats, setStats] = useState({
    totalCompanies: 0,
    totalResources: 0,
    totalCoreSubjects: 0,
    totalQuestions: 0,
    totalVisitors: 0,
  });

  const [loadingStats, setLoadingStats] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await API.get("/stats");
        setStats(data.stats);
      } catch (error) {
        console.error("Failed to load stats", error);
      } finally {
        setLoadingStats(false);
      }
    };

    fetchStats();
  }, []);

  const handleProtectedNavigation = (path) => {
    if (user) {
      navigate(path);
    } else {
      navigate("/login");
    }
  };

  const statCards = [
    {
      value: loadingStats ? "..." : `${stats.totalCompanies}+`,
      label: "Companies",
    },
    {
      value: loadingStats ? "..." : `${stats.totalResources}+`,
      label: "Resources & Notes",
    },
    {
      value: loadingStats ? "..." : `${stats.totalCoreSubjects}+`,
      label: "Core Subjects",
    },
    {
      value: loadingStats ? "..." : `${stats.totalQuestions}+`,
      label: "Questions",
    },
    {
      value: loadingStats ? "..." : `${stats.totalVisitors}+`,
      label: "Visitors",
    },
  ];

  const featureCards = [
    {
      title: "Dashboard",
      description:
        "Track your progress, monitor preparation, and manage your placement journey from one place.",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
      path: "/dashboard",
    },
    {
      title: "Companies",
      description:
        "Explore company-wise preparation pages, question lists, and direct problem-solving links.",
      image:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
      path: "/companies",
    },
    {
      title: "Resources & Notes",
      description:
        "Browse useful subject-wise notes, PDFs, and preparation material in one clean interface.",
      image:
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200&auto=format&fit=crop",
      path: "/resources",
    },
    {
      title: "Interview Experiences",
      description:
        "Read real interview experiences shared by students and prepare with more confidence.",
      image:
        "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1200&auto=format&fit=crop",
      path: "/experiences",
    },
    {
      title: "Add Experience",
      description:
        "Share your placement experience, rounds, and tips to help juniors and batchmates.",
      image:
        "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1200&auto=format&fit=crop",
      path: "/add-experience",
    },
    {
      title: "Placement Tracker",
      description:
        "View placement updates, company details, CTC, stipend, and status in one smart tracker.",
      image:
        "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=1200&auto=format&fit=crop",
      path: "/placement-tracker",
    },
  ];

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gradient-to-b from-blue-50 via-white to-gray-50">
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="inline-block bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-medium mb-4 shadow-sm">
              LNMIIT Placement Preparation Platform
            </p>

            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
              Prepare smarter, crack placements with confidence.
            </h1>

            <p className="text-lg text-gray-600 mb-8 leading-8">
              Explore company-wise questions, browse notes and resources,
              learn from interview experiences, and build your placement journey
              in one organized portal.
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => handleProtectedNavigation("/companies")}
                className="bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:bg-blue-800 hover:scale-105 transition duration-300"
              >
                Explore Companies
              </button>

              <button
                onClick={() => handleProtectedNavigation("/resources")}
                className="border border-blue-700 text-blue-700 px-6 py-3 rounded-xl font-semibold hover:bg-blue-50 hover:scale-105 transition duration-300"
              >
                Explore Resources
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -top-4 -left-4 w-28 h-28 bg-blue-200 rounded-full blur-2xl opacity-50"></div>
            <div className="absolute -bottom-6 -right-4 w-36 h-36 bg-purple-200 rounded-full blur-2xl opacity-50"></div>

            <div className="bg-white rounded-3xl shadow-xl border overflow-hidden hover:shadow-2xl transition duration-300">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop"
                alt="Students preparing together"
                className="w-full h-[380px] object-cover hover:scale-105 transition duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {statCards.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow border p-6 text-center hover:-translate-y-1 hover:shadow-xl hover:scale-[1.01] transition duration-300"
            >
              <h3 className="text-3xl font-extrabold text-blue-700 mb-2">
                {item.value}
              </h3>
              <p className="text-gray-600 font-medium">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-8">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-3">
            Everything you need for placements
          </h2>
          <p className="text-gray-600 text-lg">
            A single place for practice, revision, and interview readiness.
          </p>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

{featureCards.map((card, index) => (
  <div
    key={index}
    className="group bg-white rounded-3xl shadow-lg border overflow-hidden hover:-translate-y-3 hover:shadow-2xl transition duration-300 flex flex-col"
  >
    <img
      src={card.image}
      alt={card.title}
      className="w-full h-56 object-cover group-hover:scale-105 transition duration-500"
    />

    <div className="p-6 flex flex-col justify-between flex-1">
      <div>
        <h3 className="text-2xl font-bold mb-3">{card.title}</h3>

        <p className="text-gray-600 leading-7 mb-5">
          {card.description}
        </p>
      </div>

      <button
        onClick={() => handleProtectedNavigation(card.path)}
        className="mt-auto bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-800 hover:scale-105 transition duration-300 w-fit"
      >
        Open →
      </button>
    </div>
  </div>
))}


        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="bg-white rounded-3xl shadow-xl border overflow-hidden hover:shadow-2xl transition duration-300">
            <img
              src="https://images.unsplash.com/photo-1513258496099-48168024aec0?q=80&w=1200&auto=format&fit=crop"
              alt="Placement journey"
              className="w-full h-[350px] object-cover hover:scale-105 transition duration-500"
            />
          </div>

          <div>
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
              Why this portal is useful
            </h2>
            <div className="space-y-4">
              {[
                "Centralized platform for placement preparation",
                "Company-specific practice instead of random searching",
                "Subject notes, PDFs, and useful links in one place",
                "Interactive and modern UI for better experience",
                "Admin-managed content for structured preparation",
              ].map((point, index) => (
                <div
                  key={index}
                  className="bg-white border shadow-sm rounded-2xl p-4 hover:translate-x-2 hover:shadow-md transition duration-300"
                >
                  <p className="text-gray-700 font-medium">{point}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-16">
        <div className="bg-gradient-to-r from-blue-700 to-indigo-700 rounded-3xl text-white p-10 shadow-xl">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-4xl font-extrabold mb-4">
                Start your placement journey today
              </h2>
              <p className="text-lg text-blue-100 leading-8">
                Build consistency, practice company questions, and stay ready
                for interviews with one smart portal.
              </p>
            </div>

            <div className="flex md:justify-end gap-4 flex-wrap">
              <button
                onClick={() => handleProtectedNavigation("/companies")}
                className="bg-white text-blue-700 px-6 py-3 rounded-xl font-semibold hover:scale-105 hover:bg-gray-100 transition duration-300"
              >
                Explore Companies
              </button>

              <button
                onClick={() => handleProtectedNavigation("/resources")}
                className="border border-white text-white px-6 py-3 rounded-xl font-semibold hover:bg-white hover:text-blue-700 hover:scale-105 transition duration-300"
              >
                Explore Resources
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;