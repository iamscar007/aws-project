const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config()

const authRoutes = require("./routes/auth")
const movieRoutes = require("./routes/movie")
const userRoutes = require("./routes/user")



const app = express()

app.use(cors())
app.use(express.json())

app.use("/auth", authRoutes)
app.use("/movies", movieRoutes)
app.use("/user", userRoutes)

mongoose.connect(process.env.MONGO_URL)
.then(()=> console.log("MongoDB Connected"))

app.listen(5000, "0.0.0.0", () => {
  console.log("Server running");
});