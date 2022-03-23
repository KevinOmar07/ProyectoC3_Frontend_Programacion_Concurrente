import React from "react";
import axios from "axios";
import {withRouter} from "react-router-dom";
import update from "immutability-helper";
import '/src/perfile.css'
import user from '../img/user.png'

class HomePerfile extends React.Component{

    constructor() {
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

    enviar_fotos(){
        const formData = new FormData();
        const inputFile = document.getElementById("file");

        for (const file of inputFile.files) {
            formData.append("files", file, file.name);
        }

        axios.post('http://localhost:3001/set_image2?id=110',
            formData
        ).then(data => {

            if(data.data === "guardado"){
                alert("Las imagenes se subieron correctamente");

            }else{
                alert("No se pudieron subir las imagenes")
                console.log(data)
            }
        }).catch(e => {
            alert("No se pudo conectar al servidor")
        });
    }

    render() {
        return(
            <>
                <header className="position-absolute p-3 col-12 d-flex flex-row-reverse bd-highlight">
                    <div>
                        <div className="content-file me-2 position-absolute top-50 start-50 translate-middle">
                            <div className="row justify-content-start ">
                                <input type="file" id="file" className="form-control col-4 col-sm-3" multiple/>
                                <button onClick={this.enviar_fotos.bind(this)} className="bton-file btn btn-outline-secondary col-4 col-sm-3" type="button">Subir</button>
                            </div>
                        </div>
                        <form className="d-flex justify-content-end me-2 col-lg-auto mb-lg-0 mb-lg-3 p-2 bd-highlight">
                            <img src={user} alt="cargando imagen..." className="icon-user"/>
                            <label className="container label ">nombre-usario</label>
                        </form>
                    </div>
                </header>
                <div className="menu d-flex flex-column flex-shrink-0 p-3 text-white">
                    <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor"
                             className="bi me-2 bi-camera" viewBox="0 0 16 16">
                            <path
                                d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1v6zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2z"/>
                            <path
                                d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z"/>
                        </svg>
                        <span className="fs-4" >FotoCard</span>
                    </a>
                    <hr/>
                    <ul className="nav nav-pills flex-column mb-auto">
                        <li className="nav-item">
                            <a href="#" className="nav-link active" aria-current="page">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                     className="bi me-2 bi-house-door" viewBox="0 0 16 16">
                                    <path
                                        d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4H2.5z"/>
                                </svg>
                                Home</a>
                        </li>
                        <li>
                            <a href="#" className="nav-link text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                     className="bi me-2 bi-box-arrow-left" viewBox="0 0 16 16">
                                    <path d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z"/>
                                    <path d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"/>
                                </svg>
                                Salir</a>
                        </li>
                        <li>
                            <a href="#" className="nav-link text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                     className="bi me-2 bi-question-circle" viewBox="0 0 16 16">
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                    <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"/>
                                </svg>
                                Ayuda</a>
                        </li>
                    </ul>
                    <hr/>
                </div>

            </>
        );
    }
}

export default withRouter(HomePerfile);