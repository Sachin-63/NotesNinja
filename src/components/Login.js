import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

const Login = (props) => {
    const [credentials, setCredentials] = useState({email:"",password:""})
    //Utility for redirecting
    let history=useHistory();
    

    const handleSubmit=async(e)=>{
        e.preventDefault()
        const response = await fetch(`https://notes-ninja.herokuapp.com/api/auth/login`, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',         
            },
            body: JSON.stringify({email:credentials.email,password:credentials.password})
          });
          const json=await response.json();
          console.log(json); 
          if(json.success){
              //Save auth-token in local storage and Redirect
              localStorage.setItem('token',json.authToken)
              props.showAlert("Logged in Successfully","success")
              //Redirectiong user to Home page if login successfully
              history.push('/')
          }
          else{
              //alert("Invalid Creds")
              props.showAlert("Invalid Credentials","danger")
          }
    }
    const onChange=(e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

    return (
        <div className="container">
            <h1 className="display-5 text-warning mt-2 d-flex justify-content-center">Login</h1>
            <div className="container" style={{paddingLeft:"25%",paddingRight:"25%"}}>
            <form onSubmit={handleSubmit}> 
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" style={{backgroundColor:"#212529"}} value={credentials.email} onChange={onChange} name="email" className="form-control text-light" id="email" aria-describedby="emailHelp"/>
                    
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" style={{backgroundColor:"#212529"}} value={credentials.password} onChange={onChange} name="password" className="form-control text-light" id="password"/>
                </div>
                
                <button type="submit" className="btn btn-warning my-2" >Login</button>
            </form>
            </div>
        </div>
    )
}

export default Login
