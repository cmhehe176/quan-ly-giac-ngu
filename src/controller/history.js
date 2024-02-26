const history = require('../model').history
const create = async (req, res)=>{
    try{
        await history.create(req.body)
        res.status(200).json({error: null, data: null})
    }
    catch(error){
        res.status(500).json({error: error.message, data: null})
    }
}
const read = async (req, res)=>{
    try{
        let res_history = await history.find(req.query)
        res.status(200).json({error: null, data: res_history})
    }
    catch(error){
        res.status(500).json({error: error.message, data: null})
    }
}
module.exports = {create, read}