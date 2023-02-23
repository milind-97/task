const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors');
const app = express()
const errorMiddleware = require('./middleware/error')
app.use(express.json())
app.use(cookieParser())
app.use(cors())
const user = require('./routes/userRoute')
const task = require('./routes/taskRoute')
app.use("/api/v1",user)
app.use("/api/v1",task)

app.use(errorMiddleware)
module.exports = app