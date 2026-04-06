const Task = require("../models/Task.model")
const Day = require("../models/Day.model")
const Trip = require("../models/Trip.model")

// CREATE TASK
exports.createTask = async(req, res) => {
    try {
        const {dayId, title, notes, mapLink, reelLink, timeSlot} = req.body

        const day = await Day.findById(dayId)

        if(!day){
            return res.status(404).json({
                message: "day not found"
            })
        }

        const trip = await Trip.findById(day.tripId)

        if(trip.userId.toString() !== req.user._id.toString()){
            return res.status(403).json({
                message: "not authorize"
            })
        }

        const task = await Task.create({
            dayId,
            title,
            notes,
            mapLink,
            reelLink,
            timeSlot
        })

        res.status(201).json({
            message: "task created successfully",
            task
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}


// GET TASKS OF THE DAY
exports.getTasksByDay = async(req, res) => {
    try {
        const tasks = await Task.find({
            dayId: req.params.dayId,
        }).sort({createdAt: 1})

        res.json(tasks)
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}


//TOGGLE COMPLETED STATUS
exports.toggleTaskCompletion = async(req, res) => {
    try {
        const task = await Task.findById(req.params.id)
        if(!task){
            return res.status(404).json({
                message: "task not found"
            })
        }

        task.completed = !task.completed

        await task.save()
        res.json(task)
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}


// UPDATE BOOKING STATUS
exports.updateBookingStatus = async(req, res) => {
    try {
        const {bookingStatus} = req.body

        const task = await Task.findById(req.params.id)
        if(!task){
            return res.status(404).json({
                message: "task not found"
            })
        }

        task.bookingStatus = bookingStatus

        await task.save()
        res.json(task)
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}


// DELETE TASK
exports.deleteTask = async(req, res) => {
    try {
        const taks = await Task.findById(req.params.id)

        if(!task){
            return res.status(404).json({
                message: "Task not found"
            })
        }

        await task.deleteOne()
        res.json({
            message: "task deleted successfully"
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}