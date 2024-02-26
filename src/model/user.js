const mongoose = require("mongoose")
const Schema = mongoose.Schema
const userSchema = new Schema({

    username: {
        type: String
    },
    password: {
        type: String,
        minlength: 5
    },
    name: {
        type: String
    },
    birthday: {
        type: Date
    }
})
module.exports.user = mongoose.model("user", userSchema)