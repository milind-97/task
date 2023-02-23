const mongoose = require('mongoose')
const validator = require('validator')
const taskSchema = mongoose.Schema({
    task :{
        type: String,
        required: [true, 'Please Enter Task']
    },
    date: {
        type: Date,
        required: [true,'Date Is Required']
    },
    status: {
        type: String,
        required: [true,'Date Is Required']
    },
    createdAt: {
        type: Date,
        default: Date.now(),

    },
})

module.exports = mongoose.model("tasks",taskSchema)