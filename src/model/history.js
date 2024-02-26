const mongoose = require("mongoose")
const Schema = mongoose.Schema
const historySchema = new Schema({
    data_spo2: {
        type: String
    },
    label_spo2: {
        type: String
    },
    data_heart_rate: {
        type: String
    },
    label_heart_rate: {
        type: String
    },
    create_at: {
        type: Date
    },
    user_id: String
})
module.exports.history = mongoose.model("history", historySchema)