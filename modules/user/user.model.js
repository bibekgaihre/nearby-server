const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    username: {
      type: String,
      unique: true,
    },
    apiKey: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: false,
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

module.exports = mongoose.model("User", UserSchema);
