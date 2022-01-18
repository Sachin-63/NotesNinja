//Adding Mongoose from installed mongoose package
const mongoose = require('mongoose');
//Importing Schema feature of mongoose
const {Schema} =mongoose;

//Creating a Schema for Notes DataBase//It is a template in form of an object in which the database is going to store data for the respective database
const NotesSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,//Stores data as mongoose database id
        ref:'user'//Refrence to the user database
    },
    
    title:{
        type: String,
        required: true,

    },
    describtion:{
        type: String,
        required: true
    },
    tag:{
        type: String,
        default: "General"
    },
    time:{
        type: Date,
        default: Date.now 
    }
  });
  
  //Giving a variable to defined schema(databaseName,schemaName) and exporting it
  module.exports=mongoose.model('notes',NotesSchema);