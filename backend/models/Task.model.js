const mongoose = require("mongoose")

const taskSchema = new mongoose.Schema(
    {
        dayId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Day",
            required: true
        },
        title: {
            type: String,
            required: true,
            trim: true
        },
        notes: {
            type: String,
            default: ""
        },
        mapLink: {
            type: String,
            default: "",
        },
        reelLink: {
            type: String,
            default: "",
        },
        bookingStatus: {
            type: String,
            enum: ["pending", "booked", "cancelled"],
            default: "pending"
        },
        completed: {
            type: Boolean,
            default: false
        },
        timeSlot: {
            type: String,
            default: ""
        }
    },
    {timestamps: true}
)

module.exports = mongoose.model("Task", taskSchema)