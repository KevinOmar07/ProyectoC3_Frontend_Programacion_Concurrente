import React from "react";
//import axios from "axios";
import { withRouter } from "react-router-dom";

class SignUp extends React.Component{
    constructor(props) {
        super(props);
    };

    render() {
        return(
            <>
                <h1>Aqui ira el registro</h1>
            </>
        );
    }
}

export default withRouter(SignUp);