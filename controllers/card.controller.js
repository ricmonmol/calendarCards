const Card = require("../models/card.model")

const getAllCards = async (req, res) => {
  try {
    const cards = await Card.find()
    res.status(200).json(cards)
  } catch (err) {
    return res.status(400).json({
      message: err
    })
  }
}

const createCard = async (req, res) => {
  try {
    let card = new Card(req.body)
    await card.save()
    return res.status(200).json(card)
  } catch (err) {
    return res.status(400).json({
      message: err
    })
  }
}

const listCards = async (req, res) => {
  try {
    let cards = await Card.find().select("title date color text user")
    res.status(200).json(cards)
  } catch (err) {
    return res.status(400).json({
      message: err
    })
  }
}

const updateCard = async (req, res) => {
  try {
    let cardId = req.params.cardId
    let updatedCard = await Card.findByIdAndUpdate(cardId, req.body, { new: true })
    if (!updatedCard) {
      return res.status(404).json({
        error: "Card not found"
      })
    }
    res.status(200).json(updatedCard)
  } catch (err) {
    return res.status(400).json({
      message: err
    })
  }
}

const removeCard = async (req, res) => {
  try {
    let cardId = req.params.cardId
    let deletedCard = await Card.findByIdAndDelete(cardId)
    if (!deletedCard) {
      return res.status(404).json({
        message: "Card not found"
      })
    }
    res.status(200).json({
      message: "Card deleted"
    })
  } catch (err) {
    return res.status(400).json({
      message: err
    })
  }
}

module.exports = { getAllCards, createCard, listCards, updateCard, removeCard }