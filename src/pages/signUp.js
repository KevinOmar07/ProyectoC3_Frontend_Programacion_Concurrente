import React from "react";
import update from 'immutability-helper';
import { withRouter } from "react-router-dom";
import axios from "axios";
import icon from "../img/icon-user.png";
import swal from "sweetalert";

class SignUp extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            idPassword: '',
            confpassword: '',
            aux: true,

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
        const aux = this.validarPass()
        if (this.status && aux) {

            axios.post('http://localhost:3001/singup',{
                data : {
                    user: this.state.username,
                    password: this.state.idPassword
                }
            }).then(dataRes => {
                if (dataRes.data === 'usuario creado'){
                    swal("Exito", dataRes.data, "success");
                    this.props.history.push('/')
                }else{
                    swal("Error", dataRes.data, "error");
                }
            })
        }else if (!this.status){
            this.messageError.innerHTML = 'Los campos marcados con * son obligatorios'
        }
        e.preventDefault()

    }

    validarCampos(){
        let estado = true;

        if (this.state.username.length === 0) {
            this.username.innerHTML = "*Usuario"
            estado = false;
        } else
            this.username.innerHTML = ""

        if(this.state.idPassword.length === 0){
            this.idPassword.innerHTML = "*Contraseña"
            estado = false;
        } else
            this.idPassword.innerHTML = ""

        if(this.state.confpassword.length === 0){
            this.confpassword.innerHTML = "*Confirmacion"
            estado = false;
        } else
            this.confpassword.innerHTML = ""

        this.status = estado;
    }

    limpiar(){
        if (this.state.idPassword.length <1 && this.state.confpassword.length < 1){
            this.passwordSuccess.innerHTML = ''
            this.confpassword.innerHTML = ''
        } else if (this.state.idPassword.length >= 1 && this.state.confpassword.length >= 1) {
            this.validarPass()
        }
    }

    validarPass(){
        let contrasenia = this.state.idPassword;
        if(contrasenia == this.state.confpassword){
            this.confpassword.innerHTML = ""
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
                }

                if (mayuscula == true && minuscula == true && numero == false && caracter_raro == false){
                    this.passwordSuccess.innerHTML = 'Contraseña debil'
                    document.getElementById('labelSuccesPass').style.color = 'orange';
                    this.idPassword.innerHTML = ""
                    return true
                }

                if (mayuscula == true && minuscula == true && numero == true && caracter_raro == false){
                    this.passwordSuccess.innerHTML = 'Contraseña normal'
                    document.getElementById('labelSuccesPass').style.color = 'goldenrod';
                    this.idPassword.innerHTML = ""
                    return true
                }

                if(mayuscula == true && minuscula == true && caracter_raro == true && numero == true ) {
                    this.passwordSuccess.innerHTML = 'Contraseña Fuerte'
                    document.getElementById('labelSuccesPass').style.color = 'green';
                    this.idPassword.innerHTML = ""
                    return true
                }

                if (mayuscula == true || minuscula == true || caracter_raro == true || numero == true ) {
                    this.passwordSuccess.innerHTML = 'Contraseña vulnerable'
                    document.getElementById('labelSuccesPass').style.color = 'red';
                    this.idPassword.innerHTML = ""
                    return true
                }
            } else if (contrasenia.length > 0){
                this.passwordSuccess.innerHTML = 'Contraseña de 8 o más caracteres'
                document.getElementById('labelSuccesPass').style.color = 'red';
                this.idPassword.innerHTML = ""
                return false;
            } else {
                this.passwordSuccess.innerHTML = ''
                return false;
            }
        } else if (contrasenia.length > 0 && this.state.confpassword.length > 0){
            this.confpassword.innerHTML = "Las contraseñas no coiciden"
            this.passwordSuccess.innerHTML = ''
            return false
        } else {
            return false
        }

    }

    render() {
        return(
          <>
              <div className="fondo-container">
                  <form className="box2 position-absolute top-50 start-50 translate-middle" id="form">
                      <img src={icon} alt="icono usuario top-50"/>
                      <h1 className="p"> Registrarse </h1>
                      <div className="mb-3">
                          <label htmlFor="username"> Nombre de usuario</label><br/>
                          <input type="text" name="username" id="username"
                                 value={this.state.username}
                                 onChange={this.changeField.bind(this)}/>
                                <label ref={self=> this.username = self}></label>
                      </div>
                      <br/>
                      <br/>
                      <div className="mb-3">
                          <label htmlFor='idPassword'> Contraseña</label><br/>
                          <input type="password" name="idPassword" id="idPassword"
                                 value={this.state.idPassword}
                                 onChange={this.changeField.bind(this)}
                                 onBlur={this.limpiar.bind(this)}
                          />
                          <label ref={self=> this.idPassword = self}></label>
                          <label className='label-error' ref={self=> this.idPassword = self}></label>
                          <label id='labelSuccesPass' ref={self=> this.passwordSuccess = self}></label>
                      </div>
                      <br/>
                      <br/>
                      <div className="mb-3">
                          <label htmlFor="confpassword"> Confirmar contraseña </label>
                          <br/>
                          <input type="password" name="confpassword" id="confpassword"
                                 value={this.state.confpassword}
                                 onChange={this.changeField.bind(this)}
                                 onBlur={this.validarPass.bind(this)}
                          />
                          <label ref={self=> this.confpassword = self}></label>
                      </div>
                      <br/>
                      <br/>
                      <button type="button" value="Enviar" className="btn btn-primary d-grid" onClick={this.registrar.bind(this)}>
                          Registrar
                      </button>
                      <div className='label-error' ref={self => this.messageError = self}></div>
                  </form>
              </div >
          </>
        );
    }
}

export default withRouter(SignUp);