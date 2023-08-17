require("dotenv").config()
const mongoose = require("mongoose")
const app = require("./express")
const PORT = process.env.PORT
const URI = process.env.URI_DB

app.listen(PORT, (err) => {
  if (err) {
    console.log(err)
  }
  console.info("Server started on port: ", PORT)
})

mongoose.Promise = global.Promise
mongoose.connect(URI)
mongoose.connection.on("error", () => {
  throw new Error("Unable to connect to database")
})