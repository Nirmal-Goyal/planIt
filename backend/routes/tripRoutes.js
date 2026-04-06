const express = require("express")
const protect = require("../middlewares/authMiddleware")

const {
    createTrip,
    getTrips,
    getTripById,
    deleteTrip,
    getTripOverview
} = require("../controllers/tripController")

const router = express.Router()

router.post("/", protect, createTrip)
router.get("/", protect, getTrips)
router.get("/:id/overview", protect, getTripOverview)
router.get("/:id", protect, getTripById)
router.delete("/:id", protect, deleteTrip)

module.exports = router