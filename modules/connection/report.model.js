const mongoose = require("mongoose");

const ReportSchema = mongoose.Schema(
  {
    reportedBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    reportedUser: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    reportCategory: {
      type: String,
    },
    reportMessage: {
      type: String,
    },
    reportedOn: {
      type: Number,
    },
  },
  {
    collection: "report",
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
    toObject: {
      virtuals: true,
    },
    toJson: {
      virtuals: true,
    },
  }
);

module.exports = mongoose.model("Report", ReportSchema);
