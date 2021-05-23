const mongoose = require("mongoose");

const ConnectionSchema = mongoose.Schema(
  {
    user: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    ],
    status: [
      {
        type: String,
        $in: ["active", "pending"],
      },
    ],
  },
  {
    collection: "connection",
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

module.exports = mongoose.model("Connection", ConnectionSchema);
