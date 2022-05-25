import React from "react";
import axios from "axios";
import {withRouter} from "react-router-dom";
import update from "immutability-helper";
import '/src/perfile.css'
import user from '../img/user.png'
import swal from 'sweetalert';
import Carousel from 'react-bootstrap/Carousel'


class HomePerfile extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            username: window.localStorage.getItem("user"),
            idUser: window.localStorage.getItem("iduser"),
            imagen: "https://res.cloudinary.com/drmqmmxnh/image/upload/v1653446979/Abstract-41_dxpcxb.jpg",
            imagenes: []
        }
    }

    componentDidMount() {
        if (!window.localStorage.getItem("token")){
            this.props.history.push("/");
        }else{
            this.obtenerFotos()
        }
    }

    changeField(e) {
        let field = e.target.name
        let value = e.target.value

        this.setState(update(this.state,{
            [field] : {$set : value}
        }))
    }

    salir(){
        window.localStorage.clear();
        this.props.history.push('/')
    }

    obtenerFotos(){
        let idUsuario = window.localStorage.getItem("iduser");

        axios.get('http://localhost:3001/get_Images?id='+idUsuario, {
            data : {
                id: idUsuario,
            }
        }).then(data => {

            let aux = []
            for (var i=0; i<data.data[1].length; i++){
                aux.push(data.data[1][i])
            }

            this.setState({ imagenes: aux})


        });

    }


    async enviar_fotos(){
        const formData = new FormData();
        const inputFile = document.getElementById("file");
        let loading = document.getElementsByClassName("divloading");
        loading[0].style.display = "block";

        for (const file of inputFile.files) {
            formData.append("files", file, file.name);
        }
        const getFormDataSize = (formData) => [...formData].reduce((size, [name, value]) => size + (typeof value === 'string' ? value.length : value.size), 0);

        if (getFormDataSize(formData) > 0){
            await axios.post('http://localhost:3001/set_image2?id='+this.state.idUser,
                formData
            ).then(data => {
                if(data.data === "Imagenes Guardadas"){
                    this.obtenerFotos()
                    swal(data.data, "Imagenes subidas correctamente", "success");

                }else{
                    swal("Error", "No se pudieron subir las imagenes o no hay imagenes para subir", "error");
                }
            }).catch(e => {
                swal("Error", "No se pudo conectar al servidor", "error");
            });
        } else {
            swal("Error", "No ha agregado ninguna imagen", "error");
        }
        loading[0].style.display = "none";
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
                            <label className="container label ">{this.state.username}</label>
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
                            <a onClick={this.salir.bind(this)} className="nav-link text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                     className="bi me-2 bi-box-arrow-left" viewBox="0 0 16 16">
                                    <path d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z"/>
                                    <path d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"/>
                                </svg>
                                Salir</a>
                        </li>
                    </ul>
                    <hr/>
                </div>
                <div className="centrar">
                    <Carousel>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src={this.state.imagen}
                                alt="First slide"
                            />
                        </Carousel.Item>
                        {
                            this.state.imagenes.map(item => {
                                return <Carousel.Item className="carousel-item">
                                    <img
                                        className="d-block w-100"
                                        src={item}
                                        alt="Third slide"
                                        width="10px"
                                    />
                                </Carousel.Item>
                            })
                        }
                    </Carousel>
                </div>
                <div className="div-spin divloading">
                    <div className="prueba">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Subiendo...</span>
                        </div>
                    </div>
                    <div className="centrar2">
                        <h2>Subiendo imagenes...</h2>
                    </div>
                </div>
            </>
        );
    }
}

export default withRouter(HomePerfile);