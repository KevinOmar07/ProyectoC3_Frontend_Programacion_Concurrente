import React from "react";
import {withRouter} from "react-router-dom"
import icon from '../img/icon-user.png'
import '/src/signIn.css'
import update from "immutability-helper";
import axios from "axios";
import swal from "sweetalert";

class SignIn extends React.Component{
    constructor() {
        super();
        this.state = {
            username:'',
            password: ''
        }
    }

    componentDidMount() {
        window.localStorage.clear();
    }

    changeField(e) {
        let field = e.target.name
        let value = e.target.value

        this.setState(update(this.state, {
            [field] : {$set : value}
        }))
    }

    signUp(){
        this.props.history.push('/signUp');
    }

    validarCampos(){
        let estado = true;

        if (this.state.username.length === 0) {
            this.username.innerHTML = "*Usuario"
            estado = false;
        } else
            this.username.innerHTML = ""

        if(this.state.password.length === 0){
            this.password.innerHTML = "*Contraseña"
            estado = false;
        } else
            this.password.innerHTML = ""

        return estado;
    }
    iniciarSesion(){
        if (this.validarCampos()){
            axios.post('http://localhost:3001/login',{
                data : {
                    user: this.state.username,
                    password: this.state.password
                }
            }).then(dataRes => {
                if (dataRes.data['status'] === 'Logueado'){
                    swal(" ", "Incio de sesion correcto", "success");
                    window.localStorage.setItem('iduser', dataRes.data['id']);
                    window.localStorage.setItem('user', this.state.username);
                    window.localStorage.setItem('token', "eyJhbGciOiJIUzUxMiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJDb25jdXJyZW50ZSIsIlVzZXJuYW1lIjoiUmVhY3QuanMiLCJleHAiOjE2NDgwMTg5OTAsImlhdCI6MTY0ODAxODk5MH0.IreuNdC3bXm-hraaprcxDyxCjP3je-OXEtMw5zcLKBkuBeDhjKGu3S1HXTnqjJb5s9S34yvt9zQF8GoIL5Uoag");
                    this.props.history.push('/perfile')
                }else{
                    swal(dataRes.data['status'], "Incio de sesion Incorrecto", "error");
                }
            })
        } else {
            this.messageError.innerHTML = 'Los campos marcados con * son obligatorios'
        }
    }

    render() {
        return(
            <>
                <div className="fondo-container">
                    <form className="box position-absolute top-50 start-50 translate-middle">
                        <img src={icon} alt="icono usuario top-50"/>
                        <h1 className="p">Iniciar sesión</h1><br/>
                        <div className="mb-3">
                            <label htmlFor="username"> Usuario </label><br/>
                            <input type="text" name="username" id="username"
                                   value={this.state.username}
                                   onChange={this.changeField.bind(this)}/>
                            <label ref={self=> this.username = self}></label>
                        </div>
                        <br/>
                        <br/>
                        <div className="mb-3">
                            <label htmlFor='password'> Contraseña</label><br/>
                            <input type="password" name="password" id="password"
                                   value={this.state.password}
                                   onChange={this.changeField.bind(this)}
                            />
                            <label ref={self=> this.password = self}></label>
                        </div>
                        <br/>
                        <br/>
                        <button type="button" className="btn btn-primary d-grid" onClick={this.iniciarSesion.bind(this)}>Iniciar sesión</button>
                        <p>¿No tienes cuenta? <a className="link-primary" onClick={this.signUp.bind(this)}>Registrarme</a></p>
                        <div className='label-error' ref={self => this.messageError = self}></div>
                    </form>
                </div>
            </>
        );
    }
}

export default withRouter(SignIn)