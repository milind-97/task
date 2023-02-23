const app = require('./app')
const dotenv = require('dotenv')
const cors = require('cors');
const connectdb = require('./config/database')
///config
dotenv.config({path:'backend/config/config.env'})
connectdb()

process.on("uncaughtException", (err)=>{
    console.log(`err: ${err.message}`)
    console.log('Shutting Down The Server Due to unCaughtException')
    server.close(()=>{
        process.exit(1)
    })
})
const server = app.listen(process.env.PORT,()=>{
    console.log(`Server is working on ${process.env.PORT}`)
})
//
process.on("unhandledRejection", (err)=>{
    console.log(`err: ${err.message}`)
    console.log('Shutting Down The server Due to unHandledRejection')
    server.close(()=>{
        process.exit(1)
    })
})