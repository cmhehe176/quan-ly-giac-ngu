import connect from './model/index'
const cors = require('cors')
const path = require('path')
require('dotenv').config()
const express = require('express')

const app = express()
app.listen(process.env.PORT)
app.use(cors())
app.use(express.static(path.join(__dirname, "src/view")))
app.use(express.json());
app.use(express.urlencoded());
connect()
app.get("/signin", (req, res)=>{
    console.log(path.join(__dirname))
    res.sendFile(path.join(__dirname, "src/view/signin.html"))
})
app.get("/signup", (req, res)=>{
    console.log(path.join(__dirname))
    res.sendFile(path.join(__dirname, "src/view/signup.html"))
})
app.get("/normal-alarm", (req, res)=>{
    res.sendFile(path.join(__dirname, "src/view/normal-alarm.html"))
})
app.get("/advance", (req, res)=>{
    res.sendFile(path.join(__dirname, "src/view/advance.html"))
})
app.get("/histories", (req, res)=>{
    res.sendFile(path.join(__dirname, "src/view/history.html"))
})
app.get("/profile", (req, res)=>{
    res.sendFile(path.join(__dirname, "src/view/user.html"))
})

app.use(require('./src/router/user').router)
app.use(require('./src/router/history').router)
app.use(require('./src/router/alarm').router)