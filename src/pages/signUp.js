import React from "react";
//import axios from "axios";
import { withRouter } from "react-router-dom";

class SignUp extends React.Component{
    constructor() {
        super()
        this.state = {

        }
    };

    changeField(e) {
        let field = e.target.name
        let value = e.target.value

        this.setState(update(this.state,{
            [field] : {$set : value}
        }))
    }

    registrar(){
        this.messageError.innerHTML = ''
        this.validarCampos()
        if (this.status && this.usernameOk) {
            let user = {
                username: this.state.username,
                password: this.state.password,
                confpassword: this.state.confpassword
            }
        }
    }

    validarCampos(){


    }

    render() {
        return(
          <React.Fragment>
              <div className="container position-absolute top-50 start-50">
                  <h1> REGISTRARSE</h1>
                  <form onSubmit={this.registrar.bind(this)}>
                    <div>
                        <label htmlFor="user"> Nombre de usuario</label>
                        <br/>
                        <input type="text" name="user" id="user" placeholder="Nombre de usuario"/>
                        <br/>
                        <label htmlFor="password"> Contraseña</label>
                        <br/>
                        <input type="text" name="password" id="password" placeholder="Contraseña"/>
                        <br/>
                        <label htmlFor="confirmpass"> Confirmar contraseña </label>
                        <br/>
                        <input type="text" name="confirmpass" id="confirmpass" placeholder="Confirmar contraseña"/>
                        <br/>
                        <input type="submit" value="Enviar"/>
                    </div>
                  </form>
              </div>
          </React.Fragment>
        );
    }
}

export default withRouter(SignUp);