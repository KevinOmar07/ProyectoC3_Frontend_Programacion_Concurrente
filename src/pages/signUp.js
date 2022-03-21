import React from "react";
import update from 'immutability-helper';
//import axios from "axios";
import { withRouter } from "react-router-dom";
import fondo from "../img/fondo.jpg"
import axios from "axios";
import data from "bootstrap/js/src/dom/data";
import icon from "../img/icon-user.png";

class SignUp extends React.Component{
    constructor() {
        super()
        this.state = {
            username: '',
            password: '',
            confpassword: '',

        }
        this.status = false
        this.usernameOk = false
    };

    changeField(e) {
        let field = e.target.name
        let value = e.target.value

        this.setState(update(this.state,{
            [field] : {$set : value}
        }))
    }

    registrar(e){
        this.messageError.innerHTML = ''
        this.validarCampos()
        if (this.status && this.usernameOk) {
            let user = {
                username: this.state.username,
                password: this.state.password,
                confpassword: this.state.confpassword
            }
            axios.post('http://localhost:8000/signUp',{
                data: user
            }).then((data)=>{

            })
        }else{
            this.messageError.innerHTML = 'Los campos marcados con * son obligatorios'
        }
        e.preventDefault()

    }

    validarCampos(){
        let estado = true;

        if (this.state.username.length === 0) {
            this.username.innerHTML = '* '
            estado = false;
        } else
            this.username.innerHTML = ''

        if(this.state.password.length === 0){
            this.password.innerHTML = '* '
            estado = false;
        } else
            this.password.innerHTML = ''

        if(this.state.confpassword.length === 0){
            this.confpassword.innerHTML = '* '
            estado = false;
        } else
            this.confpassword.innerHTML = ''

        if(!this.validarPass()){
            this.password.innerHTML = '* '
            estado = false;
        }

        this.status = estado;
    }

    validarPass(){
        let contrasenia =this.state.password;
        if (contrasenia.length >= 8){
            var mayuscula = false;
            var minuscula = false;
            var caracter_raro = false;
            var numero = false;

            for (var i=0; i < contrasenia.length; i++){
                if (contrasenia.charCodeAt(i) >= 65 && contrasenia.charCodeAt(i) <= 90 ){
                    mayuscula = true;
                }
                else if(contrasenia.charCodeAt(i) >= 97 && contrasenia.charCodeAt(i) <= 122)
                {
                    minuscula = true;
                }
                else if(contrasenia.charCodeAt(i) >= 48 && contrasenia.charCodeAt(i) <= 57) {
                    numero = true;
                }
                else{
                    caracter_raro = true;
                }
                if (mayuscula == true && minuscula == true && numero == false && caracter_raro == false){
                    this.passwordSuccess.innerHTML = 'Contraseña debil'
                    document.getElementById('labelSuccesPass').style.color = 'orange';
                    this.validatePass = true;
                    return true
                }

                if (mayuscula == true && minuscula == true && numero == true && caracter_raro == false){
                    this.passwordSuccess.innerHTML = 'Contraseña normal'
                    document.getElementById('labelSuccesPass').style.color = 'goldenrod';
                    this.validatePass = true;
                    return true
                }

                if(mayuscula == true && minuscula == true && caracter_raro == true && numero == true ) {
                    this.passwordSuccess.innerHTML = 'Contraseña Fuerte'
                    document.getElementById('labelSuccesPass').style.color = 'green';
                    this.validatePass = true;
                    return true
                }
            }
        }

    }

    render() {
        return(
          <>
              <div className="fondo position-relative">
                  <img src={fondo} className="img-fluid " alt="Cargando imagen.."/>
                  <form className="box position-absolute top-50 start-50 translate-middle">
                      <img src={icon} alt="icono usuario top-50"/>
                      <h1> REGISTRARSE</h1>
                      <div className="mb-3">
                          <label > Nombre de usuario</label><br/>
                          <input type="text" name="username" id="username"
                                 value={this.state.username}
                                 onChange={this.changeField.bind(this)}/><br/>
                          <div className="mb-3">
                              <label > Contraseña</label><br/>
                              <input type="password" name="password" id="password"
                                     value={this.state.password}
                                     onChange={this.changeField.bind(this)}
                                     onBlur={this.validarPass.bind(this)}
                              /><br/>
                              <label className='label-error' ref={self=> this.password = self}></label>
                              <label id='labelSuccesPass' ref={self=> this.passwordSuccess = self}></label>
                          </div>
                          <div className="mb-3">
                              <label> Confirmar contraseña </label>
                              <br/>
                              <input type="password" name="confpassword" id="confpassword"
                                    value={this.state.confpassword}
                                     onChange={this.changeField.bind(this)}
                              />
                              <br/>
                          </div>
                          <button type="submit" value="Enviar" className="btn btn-primary d-grid" onClick={this.validarCampos.bind(this)}>
                              Registrar
                          </button>
                          <div className='{label-error}' ref={self => this.messageError = self}></div>
                      </div>
                  </form>
              </div >
          </>
        );
    }
}

export default withRouter(SignUp);