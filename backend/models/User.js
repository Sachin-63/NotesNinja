//Adding Mongoose from installed mongoose package
const mongoose = require('mongoose');
//Importing Schema feature of mongoose
const {Schema} =mongoose;

//Creating a Schema for Users DataBase//It is a template in form of an object in which the database is going to store data for the respective database
const userSchema = new Schema({
    
    name:{
        type: String,
        required: true,

    },
    email:{
        type: String,
        required: true,
        unique:true
    },
    password:{
        type: String,
        required: true 
    },
    time:{
        type: Date,
        default: Date.now 
    }
  });

  //Giving a variable to defined schema(databaseName,schemaName) to export
  const User=mongoose.model('user',userSchema);
  
  module.exports=User