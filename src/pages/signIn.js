import React from "react";
import {withRouter} from "react-router-dom"
import fondo from '../img/fondo.jpg'
import icon from '../img/icon-user.png'
import {BrowserRouter as Router, Route} from "react-router-dom";
import '/src/signIn.css'
import update from "immutability-helper";

class SignIn extends React.Component{
    constructor(props) {
        super();
        this.state = {
            username:'',
            password: ''
        }
    }

    changeField(e) {
        let field = e.target.name
        let value = e.target.value

        this.setState(update(this.state, {
            [field] : {$set : value}
        }))
    }

    login(e){
        let user = {
            username: this.state.username,
            password: this.state.password
        }
    }

    signUp(){
        this.props.history.push('/signUp');
    }

    render() {
        return(
            <>
                <div className="fondo-container">
                    <form className="box position-absolute top-50 start-50 translate-middle">
                        <img src={icon} alt="icono usuario top-50"/>
                        <h1>Iniciar sesión</h1><br/>
                        <div className="mb-3">
                            <label>Usuario</label><br/>
                            <input type="text" id="user" required/>
                        </div>
                        <div className="mb-3">
                            <label>Contraseña</label><br/>
                            <input type="password" id="password" required/>
                        </div>
                        <button type="submit" className="btn btn-primary d-grid">Iniciar sesión</button>
                        <p>¿No tienes cuenta? <a className="link-primary" onClick={this.signUp.bind(this)}>Registrarme</a></p>
                    </form>
                </div>
            </>
        );
    }
}

export default withRouter(SignIn)