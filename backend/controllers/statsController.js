const Company = require("../models/Company");
const Resource = require("../models/Resource");
const Visitor = require("../models/Visitor");

const getPortalStats = async (req, res) => {
  try {
    const companies = await Company.find();
    const resources = await Resource.find();

    const totalCompanies = companies.length;
    const totalResources = resources.length;

    const totalQuestions = companies.reduce((sum, company) => {
      return sum + (Array.isArray(company.questions) ? company.questions.length : 0);
    }, 0);

    const uniqueCategories = new Set(
      resources
        .map((resource) => resource.category)
        .filter((category) => category && category.trim() !== "")
    );

    const totalCoreSubjects = uniqueCategories.size;

    let visitorDoc = await Visitor.findOne();

    if (!visitorDoc) {
      visitorDoc = await Visitor.create({ totalVisitors: 1 });
    } else {
      visitorDoc.totalVisitors += 1;
      await visitorDoc.save();
    }

    res.status(200).json({
      success: true,
      stats: {
        totalCompanies,
        totalResources,
        totalCoreSubjects,
        totalQuestions,
        totalVisitors: visitorDoc.totalVisitors,
      },
    });
  } catch (error) {
    console.error("Stats error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch portal stats",
      error: error.message,
    });
  }
};

module.exports = { getPortalStats };