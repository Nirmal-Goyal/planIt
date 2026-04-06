const express = require("express")
const protect = require("../middlewares/authMiddleware")

const {createDay, getDaysByTrip} = require("../controllers/dayController")

const router = express.Router()

router.post("/", protect, createDay)
router.get("/:tripId", protect, getDaysByTrip)

module.exports = router