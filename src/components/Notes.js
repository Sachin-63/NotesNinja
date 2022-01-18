import React, { useContext, useState, useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom';
import noteContext from '../context/notes/noteContext';
import AddNote from './AddNote';
import NoteItem from './NoteItem';


function Notes(props) {
    const context = useContext(noteContext);
    const { notes, getNotes,editNote } = context;
    let history=useHistory();
    useEffect(() => {
        if(localStorage.getItem('token')){
            getNotes();
        }else{
            history.push('/login')
        }

        // eslint-disable-next-line
    }, [])
    const [note, setNote] = useState({
        id:"",
        etitle:"",
        edescribtion:"",
        etag:""
    })
    //Used to give reference to en element
    const ref = useRef(null)
    const refClose = useRef(null)

    const updateNote = (currentNote) => {
        //clickng the element to which "ref"(ref={ref}) reference was alloted
        ref.current.click();
        setNote({id:currentNote._id,etitle:currentNote.title,edescribtion:currentNote.describtion,etag:currentNote.tag})
        //props.showAlert("Updated Successfully","success")
    }

    const handleClick=(e)=>{
        e.preventDefault();
        //addNote(note.title,note.describtion,note.tag);
        editNote(note.id,note.etitle,note.edescribtion,note.etag)
        props.showAlert("Note deleted Successfully","success")
        //Clicking the element to which "refClose" reference was alloted 
        refClose.current.click();
    }
    
    const onChange=(e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }

    return (
        <>
            <AddNote showAlert={props.showAlert}/>

            <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" >
                    <div className="modal-content" style={{ backgroundColor: "#181A1F", color: "white" }}>
                        <div className="modal-header">
                            <h5 className="modal-title text-warning" id="exampleModalLabel">Edit Node</h5>
                            <button type="button" ref={refClose}  className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body border-top border-bottom border-warning border-1">
                            <form>
                                <div className="mb-3 ">
                                    <label htmlFor="etitle" className="form-label ">Title</label>
                                    <input type="text" value={note.etitle} style={{ backgroundColor: "#212529" }} className="form-control text-light " name="etitle" id="etitle"  aria-describedby="emailHelp" onChange={onChange} />

                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescribtion" className="form-label " >Description</label>
                                    <input type="text" value={note.edescribtion} style={{ backgroundColor: "#212529" }} className="form-control text-light " name="edescribtion"   id="edescribtion" aria-describedby="emailHelp" onChange={onChange} />
                                    {/* <textarea className="form-control " style={{backgroundColor:"#212529"}} id="describtion" name="describtion" rows="3" onChange={onChange}></textarea> */}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label " >Tag</label>
                                    <input type="text" value={note.etag} style={{ backgroundColor: "#212529" }} className="form-control text-light " name="etag"  id="etag" aria-describedby="emailHelp" onChange={onChange} />
                                    {/* <textarea className="form-control " style={{backgroundColor:"#212529"}} id="describtion" name="describtion" rows="3" onChange={onChange}></textarea> */}
                                </div>

                                
                            </form>
                        </div>
                        <div className="modal-footer">

                            <button onClick={handleClick} type="button" className="btn btn-warning" disabled={note.etitle.length<3 || note.edescribtion.length<5}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container row">
                <h1 className="display-6 text-warning mt-2">Your Notes</h1>
                {notes.map((note) => {
                    return <NoteItem key={note._id} note={note} updateNote={updateNote} showAlert={props.showAlert} />
                })}
            </div>
        </>
    )
}

export default Notes
