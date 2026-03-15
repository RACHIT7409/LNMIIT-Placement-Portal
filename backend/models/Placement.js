const mongoose = require("mongoose");

const placementSchema = new mongoose.Schema(
  {
    notificationDate: {
      type: String,
      default: "",
      trim: true,
    },
    companyName: {
      type: String,
      required: [true, "Company name is required"],
      trim: true,
    },
    typeOfOffer: {
      type: String,
      default: "",
      trim: true,
    },
    branchAllowed: {
      type: [String],
      default: [],
    },
    eligibilityCGPA: {
      type: Number,
      default: 0,
    },
    jobRole: {
      type: String,
      default: "",
      trim: true,
    },
    ctc: {
      type: Number,
      default: 0,
    },
    stipend: {
      type: String,
      default: "",
      trim: true,
    },
    placedStudents: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["Open", "Ongoing", "Completed", "Pending"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Placement", placementSchema);