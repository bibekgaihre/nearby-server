const mongoose = require("mongoose");

const LocationSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    location: {
      type: "Point",
      coordinates: [],
    },
  },
  {
    collection: "user",
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

module.exports = mongoose.model("Location", LocationSchema);
