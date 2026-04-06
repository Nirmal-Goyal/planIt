const express = require("express")
const cors = require("cors")

const authRoutes = require("./routes/authRoutes")
const tripRoutes = require("./routes/tripRoutes")

const app = express();

app.use(cors())
app.use(express.json());

app.use("/api/auth", authRoutes)
app.use("/api/trips", tripRoutes)

app.get("/", (req, res) => {
    res.send("planIt API running...")
})

module.exports = app