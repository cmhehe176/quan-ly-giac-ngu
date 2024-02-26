const user = require('../model').user
const create = async (req, res)=>{
    try{
        await user.create(req.body)
        res.status(200).json({error: null, data: null})
    }
    catch(error){
        res.status(500).json({error: error.message, data: null})
    }
}
const read = async (req, res)=>{
    try{
        
        let res_user = await user.find(req.query)
        res.status(200).json({error: null, data: res_user})
    }
    catch(error){
        res.status(500).json({error: error.message, data: null})
    }
}
const update = async (req, res)=>{
    try{
        await user.findByIdAndUpdate(req.params._id, req.body)
        res.status(200).json({error: null, data: null})    
    }
    catch(error){
        res.status(500).json({error: error.message, data: null})
    }
}
const authenticate = async (req, res)=>{
    try{
        let res_account = await user.find(req.body)
        if(res_account.length > 0){
            res.status(200).json({data: res_account, error: null})
        }
        else{
            res.status(401).json({data: null, error: "Sai tài khoản hoặc sai tên mật khẩu"})
        }
    }
    catch(error){
        res.status(500).json({data: null, error: error.message})
    }
}
module.exports = {create, read, update, authenticate}