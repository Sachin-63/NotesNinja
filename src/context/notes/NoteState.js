import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "https://notes-ninja.herokuapp.com"

  //Creating a state for notes
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial)

  //Get all notes
  const getNotes = async () => {
    //API Call//Sending GET Request to the server using specified headers
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      //body: JSON.stringify({title,describtion,tag})
    });
    //JSON of all the fetched notes
    const json = await response.json();
    //console.log(json)

    //Setting Notes state
    setNotes(json);
  };




//Fxn to Add a note
const addNote = async (title, describtion, tag) => {
  //API Call
  const response = await fetch(`${host}/api/notes/addNote`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'auth-token': localStorage.getItem('token')
    },
    body: JSON.stringify({ title, describtion, tag })
  });
  //Getting saved note in Datbase with all details like time, id and user
  const note =await response.json();
  //Setting it in Notes State
  setNotes(notes.concat(note));
}


//Fxn to Delete a note
const deleteNote = async(id) => {
  //API Call
  const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
    method: "DELETE",
    headers: {
      'Content-Type': 'application/json',
      'auth-token': localStorage.getItem('token')
    },
    //body: JSON.stringify({title,describtion,tag})
  });
  //const json = await response.json();
  //console.log(json)
  //console.log("Deleting the note with id:", id);

  //Removes the Note with given id and Set the remaining notes in Notes state
  const newNotes = notes.filter((note) => { return note._id !== id })
  setNotes(newNotes)
}


//Fxn Edit a note
const editNote = async (id, title, describtion, tag) => {
  //API Call
  const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
    method: "PUT",
    headers: {
      'Content-Type': 'application/json',
      'auth-token': localStorage.getItem('token')
    },
    body: JSON.stringify({ title, describtion, tag })
  });
  const json =await response.json();
  //console.log(json)

  let newNotes=JSON.parse(JSON.stringify(notes))
  for (let index = 0; index < newNotes.length; index++) {
    //const element = notes[index];
    if (newNotes[index]._id === id) {
      newNotes[index].title = title;
      newNotes[index].describtion = describtion;
      newNotes[index].tag = tag;
      break;
    }
    
  }
  setNotes(newNotes);
}

return (
  //Syntax to export the State and used Fxns
  <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
    {props.children}
  </NoteContext.Provider>
)

}

export default NoteState;