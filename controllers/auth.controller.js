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
      const token = jwt.sign({ _id: user._id }, |)
    } catch (err) {
      return res.status(401).json({
        message: err
      })
    }
  }

const signout = (req, res) => {
    res.clearCookie("t")
  }