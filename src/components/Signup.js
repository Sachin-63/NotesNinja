import React ,{useState} from 'react'
import { useHistory } from 'react-router-dom';
//import Alert from './Alert';

const Signup = (props) => {
    const [credentials, setCredentials] = useState({name:"",email:"",password:"",cpassword:""})
    let history=useHistory();
    

    const handleSubmit=async(e)=>{
        e.preventDefault()
        if(credentials.password===credentials.cpassword){
            const response = await fetch(`https://notes-ninja.herokuapp.com/api/auth/createuser`, {
                method: "POST",
                headers: {
                  'Content-Type': 'application/json',
                  
                },
                body: JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password})
              });
              
              const json=await response.json();
              console.log(json); 
              if(json.success){
                  //Save auth-token in local storage and Redirect
                  localStorage.setItem('token',json.authToken)
                  history.push('/')
                  props.showAlert("Created your account Successfully","success")
              }
              else{
                  //alert("Invalid Creds")
                  props.showAlert("Invalid Credentials","danger")
              }
        }
        else{
            props.showAlert("Passwords doesn't match","danger")
        }

    }
    const onChange=(e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }
    return (
        <div>
            <div className="container">
            <h1 className="display-5 text-warning mt-2 d-flex justify-content-center">Create An Account</h1>
            <div className="container" style={{paddingLeft:"25%",paddingRight:"25%"}}>
            <form onSubmit={handleSubmit}> 
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" style={{backgroundColor:"#212529"}}   name="name" onChange={onChange} minLength={5} required className="form-control text-light" id="name" aria-describedby="emailHelp"/>  
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" style={{backgroundColor:"#212529"}}   name="email" onChange={onChange} minLength={5} required className="form-control text-light" id="email" aria-describedby="emailHelp"/>  
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" style={{backgroundColor:"#212529"}}   name="password" onChange={onChange} minLength={5} required className="form-control text-light" id="password"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" style={{backgroundColor:"#212529"}}   name="cpassword" onChange={onChange} minLength={5} required className="form-control text-light" id="cpassword"/>
                </div>
                
                <button type="submit" className="btn btn-warning my-2" >Signup</button>
            </form>
            </div>
        </div>
        </div>
    )
}

export default Signup
