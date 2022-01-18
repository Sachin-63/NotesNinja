import React, {useContext, useState} from 'react'
import noteContext from '../context/notes/noteContext';


const AddNote = () => {
    const context=useContext(noteContext);
    const {addNote}=context;
    const [note, setNote] = useState({
        title:"",
        describtion:"",
        tag:""
    })
    const handleClick=(e)=>{
        e.preventDefault();
        addNote(note.title,note.describtion,note.tag);
        setNote({
            title:"",
            describtion:"",
            tag:""
        })
    }
    const onChange=(e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }
    return (
        <div>
            <div className="">
            {/* <hr className="mt-1" style={{color:"#FFF000", height:"2px"}}/> */}
            <div  className="container  my-2 " style={{paddingLeft:"25%",paddingRight:"25%"}}>
            <h1 className="display-5 text-warning mt-2 d-flex justify-content-center">Add a Note</h1>
            <form>
                <div className="mb-3 ">
                    <label htmlFor="title" className="form-label ">Title</label>
                    <input type="text" style={{backgroundColor:"#212529"}} className="form-control text-light " name="title" id="title" aria-describedby="emailHelp" onChange={onChange} value={note.title}/>
                    
                </div>
                <div className="mb-3">
                    <label htmlFor="describtion" className="form-label " >Description</label>
                    <input type="text" style={{backgroundColor:"#212529"}} className="form-control text-light " name="describtion"  id="describtion" aria-describedby="emailHelp" onChange={onChange} value={note.describtion}/>
                    {/* <textarea className="form-control " style={{backgroundColor:"#212529"}} id="describtion" name="describtion" rows="3" onChange={onChange}></textarea> */}
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label " >Tag</label>
                    <input type="text" style={{backgroundColor:"#212529"}} className="form-control text-light " name="tag"  id="tag" aria-describedby="emailHelp" onChange={onChange} value={note.tag}/>
                    {/* <textarea className="form-control " style={{backgroundColor:"#212529"}} id="describtion" name="describtion" rows="3" onChange={onChange}></textarea> */}
                </div>
                
                <button type="submit" className="btn btn-warning mb-3" onClick={handleClick}  disabled={note.title.length<3 || note.describtion.length<5}>Save Note</button>
            </form>

            </div>
            <hr className="mt-3" style={{color:"#FFF000", height:"2px"}}/>
            <div>
            
            </div>
        </div>
        </div>
    )
}

export default AddNote
