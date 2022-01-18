import React from 'react'
import { Link, useLocation,useHistory } from "react-router-dom";

const Navbar = () => {
    //Utitity used for redirecting the user
    let history=useHistory();

    //Used to get the location of the current page
    let location=useLocation();

    const handleLogout=()=>{
        //Removing authToken from users Local Memory
        localStorage.removeItem('token')
        //Redirecting user to Login page
        history.push('/login')
    }
    
    return (
        <div>
            <nav style={{boxShadow: "0px 4px 4px rgba(0,0,0,0.25),0px 1px 2px rgba(0,0,0,0.3)"}} className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand text-warning" to="/">NotesNinja</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname==='/'?"active text-warning":""}`}  aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname==='/about'?"active text-warning":""}`} to="/about">About</Link>
                            </li>
                        </ul>
                        {!localStorage.getItem('token') ? <form className="d-flex">
                            <Link className ="btn btn-warning" role="button" to="/login">Login</Link>
                            <Link className ="btn btn-warning mx-2" role="button" to="/signup">SignUp</Link>
                        </form>: <button className="btn btn-warning" onClick={handleLogout}>Logout</button>}
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
