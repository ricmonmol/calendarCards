const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    require: "Name is required"
  },
  email: {
    type: String,
    trim: true,
    unique: "Email already exist",
    match: [/.+\@.+\..+/, "Please fill a valid email address"],
    require: "Email is require"
  },
  created: {
    type: Date,
    default: Date.now
  },
  updated: Date,
  hashed_password: {
    type: String,
    require: "password is require"
  },
  salt: String
})

UserSchema.virtual("password").set(function(password) {
  this._password = password
  this.salt = this.makesalt
  this.hashed_password = this.encryptPassword(password)
}).get(function() {
  return this._password
})

UserSchema.methods = {
  authenticate: function(text) {
    return this.encryptPassword(text) === this.hashed_password
  },
  encryptPassword: function(password) {
    if (!password) return ""
    try {
      return crypto.createHmac("sha1", this.salt).update(password).digest("hex")
    } catch (error) {
      return ""
    }
  },
  makeSalt: function() {
    return Math.round(new Date().valueOf() * Math.random()) + ""
  }
}

UserSchema.path("hashed_password").validate(function(v) {
  if (this._password && this._password.length < 6) {
    this.invalidate("password", "Password must be at least 6 characteres")
  }
  if (this.isNew && !this._password) {
    this.invalidate("password", "Password is required")
  }
}, null)

export default mongoose.model("User", UserSchema)