const mongoose = require("mongoose");

const ConversationSchema = mongoose.Schema(
  {
    connection: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    value: {
      type: String,
      required: true,
    },
    sender: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  },
  {
    collection: "conversation",
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

module.exports = mongoose.model("Conversation", ConversationSchema);
