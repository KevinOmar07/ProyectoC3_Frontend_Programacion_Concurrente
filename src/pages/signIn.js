import React from "react";
import {withRouter} from "react-router-dom"

class SignIn extends React.Component{
    constructor(props) {
        super(props);
    }

    signUp(){
        this.props.history.push('/signUp');
    }

    render() {
        return(
            <>
                <h1>Aqui ira el inicio de sesion</h1>
                <button type="button" onClick={this.signUp.bind(this)}>iniciar</button>
            </>
        );
    }
}

export default withRouter(SignIn)