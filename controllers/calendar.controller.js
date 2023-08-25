const CalendarEvent = require("../models/calendarEvent.model")

const getAllCalendarEvents = async (req, res) => {
  try {
    let events = await CalendarEvent.find().populate("card")
    res.status(200).json(events)
  } catch (err) {
    return res.status(400).json({
      message: err
    })
  }
}

const createCalendarEvent = async (req, res) => {
  const newEvent = new CalendarEvent(req.body)
  try {
    await newEvent.save()
    res.status(200).json({
      message: "Event succesfully created"
    })
  } catch (err) {
    return res.status(400).json({
      message: err
    })
  }
}

const removeCalendarEvent = async (req, res) => {
  try {
    const eventId = req.params.eventId
    const deletedEvent = await CalendarEvent.findByIdAndDelete(eventId)
    if (!deletedEvent) {
      return res.status(404).json({ error: "Event not found" })
    }
    res.status(200).json({
      message: "Event Deleted succesfully"
    })
  } catchh(err){
    return res.status(400).json({
      message: err
    })
  }
}

module.exports = { getAllCalendarEvents, createCalendarEvent, removeCalendarEvent }