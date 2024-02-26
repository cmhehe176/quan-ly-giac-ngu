const alarm = require('../controller/alarm')
const express = require('express')
const router = express.Router()
router.post('/alarm', alarm.create)
router.get('/alarm', alarm.read)
router.delete('/alarm/:_id', alarm.remove)
router.put('/alarm', alarm.update)
module.exports = {router}