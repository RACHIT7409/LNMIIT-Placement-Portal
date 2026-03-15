const mongoose = require("mongoose");

const interviewExperienceSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    company: {
      type: String,
      required: [true, "Company name is required"],
      trim: true,
    },
    role: {
      type: String,
      required: [true, "Role is required"],
      trim: true,
    },
    rounds: {
      type: [String],
      default: [],
    },
    questionsAsked: {
      type: [String],
      default: [],
    },
    tips: {
      type: String,
      default: "",
      trim: true,
    },
    status: {
  type: String,
  enum: ["pending", "approved", "rejected"],
  default: "approved",
},
  },
  { timestamps: true }
);

module.exports = mongoose.model("InterviewExperience", interviewExperienceSchema);