require("dotenv").config()
const mongoose = require("mongoose")
const user = require("./user").user
const alarm = require("./alarm").alarm
const history = require("./history").history


const connect = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("connect succesfull")
    }
    catch(error){
        console.log("connect failure")
    }
}
module.exports = {connect, user, alarm, history}