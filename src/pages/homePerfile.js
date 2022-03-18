import React from "react";
//import axios from "axios";
import {withRouter} from "react-router-dom";

class HomePerfile extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <h>Aqui ira el perfil</h>
        );
    }
}

export default withRouter(HomePerfile);