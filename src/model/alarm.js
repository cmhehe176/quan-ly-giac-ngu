const mongoose = require("mongoose")
const Schema = mongoose.Schema
const alarmSchema = new Schema({
    time: {
        type: String
    },
    status: {
        type: Boolean,
        default: true
    },
    user_id: {
        type: String
    }
})
module.exports.alarm = mongoose.model("alarm", alarmSchema)