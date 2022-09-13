const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/inotebook?directConnection=true";
// const mongoURI = "mongodb+srv://Harsh:Harshmongodbhld@cluster0.zsaoojf.mongodb.net/?retryWrites=true&w=majority";
const connectToMongo = ()=> {
    mongoose.connect(mongoURI, ()=> {
        console.log("Connected to mongo successfully");
    })
} 

module.exports = connectToMongo;