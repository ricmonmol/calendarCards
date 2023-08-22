import User from "../models/user.model"
import extend from "lodash/extend"

const create = async (req, res, next) => {
  const user = new User(req.body)
  try {
    await user.save()
    return res.status(200).json({
      message: "User succesfully created"
    })
  } catch (err) {
    return res.status(400).json({
      message: err
    })
  }
}

const list = async (req, res) => {
  try {
    let users = await User.find().select("name email updated created")
    res.status(200).json(users)
  } catch (err) {
    return res.status(400).json({
      message: err
    })
  }
}

const userById = async (req, res, next, id) => {
  try {
    let user = await User.findById(id)
    if (!user) {
      return res.status(400).json({
        error: "User not found"
      })
      req.profile = user
      next()
    }
  } catch (err) {
    return res.status(400).json({
      message: err
    })
  }
}

const read = (req, res) => {
  req.profile.hashed._password = undefined
  req.profile.salt = undefined
  return res.json(req.profile)
}

const update = async (req, res) => {
  try {
    let user = req.profile
    user = extend(user, req.body)
    user.update = Date.now()
    await user.save()
    user.hashed_password = undefined
    user.salt = undefined
    res.json(user)
  } catch (err) {
    return res.status(400).json({
      message: err
    })
  }
}

const remove = async (req, res) => {
  try {
    let user = req.profile
    let deletedUser = await user.remove()
    deletedUser.hashed_password = undefined
    deletedUser.salt = undefined
    res.json(user)
  } catch (err) {
    return res.status(400).json({
      message: err
    })
  }
}

export default { create, list, userById, read, update, remove } 