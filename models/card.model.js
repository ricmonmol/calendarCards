const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  date: {
    type: Date,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    trim: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  updated: Date,
});

export default mongoose.model("Event", eventSchema);
