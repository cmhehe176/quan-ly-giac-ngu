const history = require('../controller/history')
const express = require('express')
const router = express.Router()
router.post('/history', history.create)
router.get('/history', history.read)
module.exports = {router}