const User = require("../models/user.model")
const jwt = require("jsonwebtoken")
const express = require("express")
require("dotenv").config

const signin = async (req, res) => {
  try {
    let user = await User.findOne({
      email: req.body.email
    })
    if (!user) {
      return res.status(404).json({
        message: "User not found"
      })
      if (!user.authenticate(req.body.password)) {
        return res.status(401).json({
          message: "Email and password not match"
        })
      }
      const token = jwt.sign({ id: user._id }, process.env.JWT, {
        expiresIn: "1h"
      })
      return { token, ...user._doc }
    }
  } catch (err) {
    return res.status(401).json({
      message: err
    })
  }
}