const express = require("express")
const protect = require("../middlewares/authMiddleware")

const {createTask, getTasksByDay, toggleTaskCompletion, updateBookingStatus, deleteTask} = require("../controllers/taskController")

const router = express.Router()

router.post("/", protect, createTask)
router.get("/:dayId", protect, getTasksByDay)
router.patch("/:id/toggle", protect, toggleTaskCompletion)
router.patch("/:id/booking", protect, updateBookingStatus)
router.delete("/:id", protect, deleteTask);

module.exports = router