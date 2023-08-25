const mongoose = require("mongoose")

const calendarSchema = new mongoose.Schema({
  card: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Card",
    requirted: true
  },
  date: {
    type: Date,
    required: true
  }
})

export default mongoose.model("calendarEvent", calendarSchema)