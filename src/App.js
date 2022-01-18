import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from "./context/notes/NoteState";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Alert from "./components/Alert";
//import Alert from "./components/Alert";

function App() {
  //Ctreated a state for the Alert
  const [alert, setAlert] = useState(null)
  const showAlert=(messege,type)=>{
    setAlert({
      msg:messege,
      type:type
    })
    //Changes Alert to null after 1.5 sec of appearance
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert alert={alert}/>
          <div className="container">
          <Switch>
            <Route exact path="/">
              <Home showAlert={showAlert}/>
            </Route>
            <Route exact path="/about">
              <About />
            </Route>
            <Route exact path="/login">
              <Login showAlert={showAlert}/>
            </Route>
            <Route exact path="/signup">
              <Signup showAlert={showAlert}/>
            </Route>
          </Switch>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
