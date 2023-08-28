const Card = require("../models/card.model")

const getAllCards = (req, res) => {
  try {
    const cards = await Card.find()
    res.status(200).json(cards)
  } catch (err) {
    return res.status(400).json({
      message: err
    })
  }
}