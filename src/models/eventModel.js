const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const eventSchema = new mongoose.Schema(
  {
    eventTitle: { type: String, required: true, trim: true },
    eventName: { type: String, required: true, trim: true, ref: "user" },
    invitedUsers: { type: [ObjectId], required: true },
    createdBy: { type: ObjectId, required: true, trim: true, ref: "user" },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("events", eventSchema);
