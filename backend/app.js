const express = require("express")
const cors = require("cors")

const authRoutes = require("./routes/authRoutes")
const tripRoutes = require("./routes/tripRoutes")
const dayRoutes = require("./routes/dayRoutes")
const taskRoutes = require("./routes/taskRoutes")

const app = express();

app.use(cors())
app.use(express.json());

app.use("/api/auth", authRoutes)
app.use("/api/trips", tripRoutes)
app.use("/api/days", dayRoutes)
app.use("/api/tasks", taskRoutes)

app.get("/", (req, res) => {
    res.send("planIt API running...")
})

module.exports = app