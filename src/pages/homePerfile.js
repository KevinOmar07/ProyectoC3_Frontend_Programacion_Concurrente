import React from "react";
//import axios from "axios";
import {withRouter} from "react-router-dom";
import update from "immutability-helper";

class HomePerfile extends React.Component{

    constructor(props) {
        super();
        this.state = {
            username: ' ',
            imagen: ' ',

        }
    }

    changeField(e) {
        let field = e.target.name
        let value = e.target.value

        this.setState(update(this.state,{
            [field] : {$set : value}
        }))
    }

    render() {
        return(
            <>
                <header>
                    <input placeholder="Buscar"/>
                    <label> Nombre de usuario</label>
                </header>
                <h>Aqui ira el perfil</h>
            </>
        );
    }
}

export default withRouter(HomePerfile);