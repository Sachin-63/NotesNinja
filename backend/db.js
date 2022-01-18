//Adding Mongoose from installed mongoose package
// const dotenv=require('dotenv');
require('dotenv').config()
var mongoose=require('mongoose');

// dotenv.config()
//The URI of the MongoDB to connect to the DataBase
// const mongoURI="mongodb://localhost:27017/notesninja?readPreference=primary&appname=MongoDB%20Compass&ssl=false"
// const MONGO_URL="mongodb+srv://DarkDevil:D%40rkDev%21l63@cluster0.bkrly.mongodb.net/notesninja?retryWrites=true&w=majority"
// const MONGO_URL = process.env.CONNECTION_URL ;
const MONGO_URL = "mongodb+srv://DarkDevil:D%40rkDev%21l63@cluster0.bkrly.mongodb.net/notesninja?retryWrites=true&w=majority" ;

//Function to connect to Mongo DataBase using Mongoose library package
// dotenv.config();
const connectToMongo=()=>{
    mongoose.connect(MONGO_URL , ()=>{
        console.log("connected to Mongo");
    })
}

module.exports=connectToMongo;