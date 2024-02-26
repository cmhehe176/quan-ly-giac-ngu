const user = require('../controller/user')
const express = require('express')
const router = express.Router()
router.post('/user', user.create)
router.get('/user', user.read)
router.put('/user/:_id', user.update)
router.post('/authenticate', user.authenticate)
module.exports = { router }