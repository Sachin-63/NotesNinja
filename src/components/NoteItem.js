import React,{useContext } from 'react'
import noteContext from '../context/notes/noteContext';

function NoteItem(props) {
    const context = useContext(noteContext)
    const {deleteNote}=context ;
    

    const {note,updateNote}=props
    return (
        <div className=" my-2 col-md-4 ">
            <div className="card border border-warning border-2" >
            <div className="card-body">
                <h5 className="card-title">{note.title}</h5>
                <p className="card-text">{note.describtion}</p>
                <span className="badge d-inline-block mt-0 mb-3 rounded-pill bg-warning text-dark">{note.tag}</span>
                <div className=" d-flex justify-content-start">
                <button onClick={()=>{deleteNote(note._id);props.showAlert("Note deleted Successfully","success")}}  className="btn btn-outline-warning me-2"><i className="far fa-trash-alt"></i></button>
                <button onClick={()=>{updateNote(note);}} className="btn btn-outline-warning me-2"><i className="fas fa-edit"></i></button>
                </div>
            </div>
            </div>
        </div>
    )
}

export default NoteItem
