const mongoose = require('mongoose')

const connectDatabase = () => {
    // mongoose.set('strictQuery', false);
    mongoose.set('strictQuery', false)
    mongoose.connect("mongodb://127.0.0.1:27017/Ecommrece",{
      // mongodb://myusername:mypassword@mydatabase.mongo.render.com:27017/mydatabase
        useNewUrlParser: true,
        // useFindAndModify: false,
        useUnifiedTopology: true
      }).then((data)=>{
        console.log(`Mongodb connected with server: ${data.connection.host} `)
    })
}
module.exports = connectDatabase
