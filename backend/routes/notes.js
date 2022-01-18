const express = require("express");
const fetchuser = require("../middleware/fetchuser");
//Importing Router from installed express package //It will help to send requests to the Mondo Database
const router = express.Router();
//Importing Notes schema and its database details
const Note = require("../models/Note");
//Importing validators
const {body,validationResult}=require('express-validator')

//Route 1 : Get all the notes using GET:'/api/auth/getuser'. Login Required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });//Find all the notes with user=current userID
        res.json(notes);
        
    } catch (error) {//Incase server doesn't respond
        console.error(error.message);
        res.status(500).send("Internal server error");
    }

});

//Route 2 : Add a new note using POST: 'api/notes/addnote'. Login required
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Title should be more than 3 characters").isLength({min: 3,}),//Validation for title
    body( "describtion","Describtion should be more than 5 characters").isLength({ min: 5 }), //Validation for Description
  ],
  async (req, res) => {
  
    try {
        //Destructuring of request body
        const { title, describtion, tag } = req.body;

        //If there are errors , return Bad requies and Error
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        //Creating a new note in Notes Datbase with given data
        const note = new Note({ title, describtion, tag, user: req.user.id });
        const savedNote = await note.save();
        res.json(savedNote);
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }

  }
);

//Route 3 : Update an existing note using PUT: 'api/notes/updatenote'. Login required
router.put(
    "/updatenote/:id",
    fetchuser,
    async (req, res) => {
        try {
            //Destructuring the request body
            const {title,describtion,tag}=req.body;

            //Create a newNote object
            const newNote={};
            if(title){
                 newNote.title=title;
            }
            if(describtion){
                 newNote.describtion=describtion;
            }
            if(tag){
                 newNote.tag=tag;
            }

            //Find the note to be updated
            let note=await Note.findById(req.params.id);//param.id from request's endpoint
            if(!note){return res.status(404).send("Not Found")}
    
            if(note.user.toString() !== req.user.id){//If the found note is not of current user
                return res.status(401).send("Not Allowed")
            }
            //Function to update in DataBase
            note=await Note.findByIdAndUpdate(req.params.id,{$set: newNote},{new:true})
            res.json(note);
        } catch (error) {//If server dont respond
            console.error(error.message);
            res.status(500).send("Internal server error");
        }

    })

//Route 4 : Delete an existing note using DELETE: 'api/notes/deletenote'. Login required
router.delete(
    "/deletenote/:id",
    fetchuser,
    async (req, res) => {
        try {
            //Find the note to be deleted
            let note=await Note.findById(req.params.id);//param.id from request's endpoint
            if(!note){return res.status(404).send("Not Found")}//Not found any note with given id
    
            
            if(note.user.toString() !== req.user.id){//If current user doesn't owns the found note
                return res.status(401).send("Not Allowed")
            }
            
            //Fxn to delete from DataBase
            note=await Note.findByIdAndDelete(req.params.id)
            res.json({note:note,"Success": "Sccessfully Deleted"});
            
        } catch (error) {//If server dont respond
            console.error(error.message);
            res.status(500).send("Internal server error");
        }

    })


module.exports = router;
