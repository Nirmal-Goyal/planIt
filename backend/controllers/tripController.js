const Trip = require("../models/Trip.model")
const Day = require("../models/Day.model")
const Task = require("../models/Task.model")

// CREATE TRIP
exports.createTrip = async(req, res) => {
    try {
        const {title, location, startDate, endDate, budget} = req.body;

        const trip = await Trip.create({
            userId: req.user._id,
            title,
            location,
            startDate,
            endDate,
            budget
        })

        res.status(201).json({
            message: "trip created successfully",
            trip
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}


// Get all trips (for logged user)
exports.getTrips = async(req, res) => {
    try {
        const trips = await Trip.find({
            userId: req.user._id
        }).sort({createdAt: -1})
        res.status(200).json({
            message: "trips fetched successfully",
            trips
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}


// Get Single Trip
exports.getTripById = async(req, res) => {
    try {
        const trip = await Trip.findById(req.params.id)
        if(!trip){
            return res.status(404).json({
                message: "trip not found"
            })
        }

        if(trip.userId.toString() !== req.user._id.toString()){
            return res.status(403).json({
                message: "not authorized to access this trip"
            })
        }
        res.json(trip)
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}


// Delete Trip
exports.deleteTrip = async(req, res) => {
    try {
        const trip = await Trip.findById(req.params.id)
        if(!trip){
            return res.status(404).json({
                message: "trip not found"
            })
        }

        if(trip.userId.toString()!==req.user._id.toString()){
            return res.status(403).json({
                message: "not authorized to delete this trip"
            })
        }

        await trip.deleteOne();

        res.json({
            message: "trip deleted successfully"
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}


// GET TRIP OVERVIEW (Trip + Days + Tasks)
exports.getTripOverview = async(req, res) => {
    try{
        const tripId = req.params.id
        const trip = await Trip.findById(tripId)
        if(!trip){
            return res.status(404).json({
                message: "trip not found"
            })
        }
        if(trip.userId.toString() !== req.user._id.toString()){
            return res.status(403).json({
                message: "not authorized"
            })
        }

        const days = await Day.find({tripId}).sort({order: 1})
        const daysWithTasks = await Promise.all(
            days.map(async (day) => {
                const tasks = await Task.find({
                    dayId: day._id,
                }).sort({createdAt: 1})

                return {
                    ...day.toObject(),
                    tasks
                }
            })
        )

        res.json({
            trip,
            days: daysWithTasks
        })
    }catch(error){
        res.status(500).json({
            message: error.message
        })
    }
}