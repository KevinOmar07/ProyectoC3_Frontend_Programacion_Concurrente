import React from "react"
import {BrowserRouter as Router, Route} from "react-router-dom";
import SignIn from "./signIn";
import SignUp from "./signUp";
import HomePerfile from "./homePerfile";
import "../signIn.css"
import "../signUp.css"
import "../perfile.css"

class App extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <Router>
                <Route exact path="/" >
                    <SignIn/>
                </Route>
                <Route exact path="/signUp" >
                    <SignUp/>
                </Route>
                <Route exact path="/perfile" >
                    <HomePerfile/>
                </Route>
            </Router>
        );
    }
}

export default App;