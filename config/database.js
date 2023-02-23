const mongoose = require('mongoose')

const connectDatabase = () => {
    // mongoose.set('strictQuery', false);
    mongoose.set('strictQuery', false)
    mongoose.connect("mongodb://127.0.0.1:27017/Ecommrece",{
        useNewUrlParser: true,
        // useFindAndModify: false,
        useUnifiedTopology: true
      }).then((data)=>{
        console.log(`Mongodb connected with server: ${data.connection.host} `)
    })
}
module.exports = connectDatabase
