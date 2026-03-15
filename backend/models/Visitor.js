const mongoose = require("mongoose");

const visitorSchema = new mongoose.Schema(
  {
    totalVisitors: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Visitor", visitorSchema);