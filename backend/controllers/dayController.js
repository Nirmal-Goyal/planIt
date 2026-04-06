const Day = require("../models/Day.model")
const Trip = require("../models/Trip.model")


//CREATE DAY
exports.createDay = async(req, res) => {
    try {
        const {tripId, date, order} = req.body

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

        const day = await Day.create({
            tripId,
            date,
            order,
        })

        res.status(201).json({
            message: "day created successfully",
            day
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}


// GET DAYS OF TRIP
exports.getDaysByTrip = async(req, res) => {
    try {
        const days = await Day.find({
            tripId: req.params.tripId
        }).sort({order: 1})

        res.status(200).json({
            message: "days fetch successfully",
            days
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}