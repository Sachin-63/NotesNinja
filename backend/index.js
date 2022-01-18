//Importing connectToMongo Fxn from "db.js"
const connectToMongo=require('./db');

const dotenv=require('dotenv');

//Importing Express from Installed Express Package
const express = require('express')

//Importing cors from installed cors package
var cors=require('cors')

//Connecting to Mongo DatBase
// connectToMongo();
dotenv.config();
//Giving a variable to express for this app
const app = express()
//The port we are going to use for bacjend
const port = process.env.PORT || 5000

//Activating cors
app.use(cors())

//
app.use(express.json());

//Available Routes and theire respactive js files
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.get('/', (req , res)=>{
  res.send("Welcome to notes ninja")
})

connectToMongo();

//opening port for current app
app.listen(port, () => {
  console.log(`NotesNinja Backend listening at http://localhost:${port}`)
})