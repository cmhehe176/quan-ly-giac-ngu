const { json } = require('express/lib/response')

const alarm = require('../model').alarm
const create = async (req, res)=>{
    try{
        await alarm.create(req.body)
        res.status(200).json({error: null, data: null})
    }
    catch(error){
        res.status(500).json({error: error.message, data: null})
    }
}
const read = async (req, res)=>{
    try{
        let res_alarm = await alarm.find(req.query)
        res.status(200).json({data: res_alarm, error: null})
    }
    catch(error){
        res.status(500).json({data: null, error: error.message})
    }
}
const remove = async (req, res)=>{
    try{
        await alarm.findByIdAndDelete(req.params._id)
        res.status(200).json({data: null, error: null})
    }
    catch(error){
        res.status(500).json({data: null, error: error.message})
    }
}
const update = async (req, res)=>{
    try{
        await alarm.findByIdAndUpdate(req.params._id, req.body)
        res.status(200).json({error: null, data: null})
    }
    catch(error){
        res.status(500).json({data: null, error: error.message})
    }
}
module.exports = {create, read, remove, update}

