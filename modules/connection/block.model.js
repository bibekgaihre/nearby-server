const mongoose = require("mongoose");

const BlockSchema = mongoose.Schema(
  {
    blockedBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    blockedUser: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  },
  {
    collection: "block",
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

module.exports = mongoose.model("Block", BlockSchema);
