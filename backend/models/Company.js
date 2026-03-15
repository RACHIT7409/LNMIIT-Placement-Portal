const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    difficulty: {
      type: String,
      default: "",
      trim: true,
    },
    topic: {
      type: String,
      default: "",
      trim: true,
    },
    problemLink: {
      type: String,
      default: "",
      trim: true,
    },
  },
  { _id: false }
);

const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Company name is required"],
      trim: true,
      unique: true,
    },
    logo: {
      type: String,
      default: "",
      trim: true,
    },
    questions: {
      type: [questionSchema],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Company", companySchema);