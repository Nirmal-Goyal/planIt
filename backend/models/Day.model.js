const mongoose = require("mongoose")

const daySchema = new mongoose.Schema(
    {
        tripId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Trip",
            required: true
        },
        date: {
            type: Date,
            required: true
        },
        order: {
            type: Number,
            required: true
        },
    },
    {timestamps: true}
)

module.exports = mongoose.model("Day", daySchema)