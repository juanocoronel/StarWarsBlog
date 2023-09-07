import React, { useState, useEffect, useContext, useRef } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";
import imagen from "../../img/how-to.png";

export const Login = () => {

    const { store, actions } = useContext(Context);
    const [login, setLogin] = useState("show active")
    const [loginST, setLoginST] = useState("active")
    const [register, setRegister] = useState("")
    const [registerST, setRegisterST] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [nombre, setnombre] = useState("")
    const [apellido, setApellido] = useState("")
    const [emailR, setEmailR] = useState("")
    const [passwordR, setPasswordR] = useState("")
    const [confirmP, setConfirmP] = useState("")
    const navigate = useNavigate()


    async function submitLogin(e){
        console.log("holaloding")
        e.preventDefault();
        let logged = await actions.login(email, password);
        if (logged === true) {
            navigate("/")
        }
    }

    async function submitSignUp(e){
        e.preventDefault();
        if (passwordR !== confirmP) {
            alert('La contraseña no coincide con la confirmacion')
        }
        else if (nombre=="" || apellido=="" || emailR=="" || passwordR=="") {
            alert('Hay campos vacíos')
        }
        else{
            await actions.signin(nombre, apellido, emailR, passwordR)
            setnombre("")
            setApellido("")
            setEmailR("")
            setPasswordR("")
            setConfirmP("")
        }
    }
    
    function logines() {
        if (login == "") {
            setLogin("show active")
            setLoginST("active")
            setRegister("")
            setRegisterST("")
        }
    }

    function registeres() {
        if (register == "") {
            setRegister("show active")
            setRegisterST("active")
            setLogin("")
            setLoginST("")
        }
    }

    return (
        <div className="bg-dark bg-opacity-75 text-white p-5" style={{margin: "70px 70px 100px 70px"}}>
            <ul className="nav nav-pills bg-black nav-justified mb-5" id="ex1" role="tablist">
                <li className="nav-item" role="presentation">
                    <a className={"nav-link " + loginST} id="tab-login" data-mdb-toggle="pill" href="#pills-login" role="tab"
                        aria-controls="pills-login" aria-selected="true" onClick={() => logines()}>Login</a>
                </li>
                <li className="nav-item" role="presentation">
                    <a className={"nav-link " + registerST} id="tab-register" data-mdb-toggle="pill" href="#pills-register" role="tab"
                        aria-controls="pills-register" aria-selected="false" onClick={() => registeres()}>Registrate</a>
                </li>
            </ul>
            <div className="tab-content">
                <div className={"tab-pane fade " + login} id="pills-login" role="tabpanel" aria-labelledby="tab-login">
                    <form onSubmit={(e) => {submitLogin(e)}}>
                        <div className="form-outline mb-4">
                            <input type="" id="loginName" className="form-control" onChange={(e)=>{setEmail(e.target.value)}}/>
                            <label className="form-label" htmlFor="loginName">Email</label>
                        </div>
                        <div className="form-outline mb-4">
                            <input type="password" id="loginPassword" className="form-control" onChange={(e)=>{setPassword(e.target.value)}}/>
                            <label className="form-label" htmlFor="loginPassword">Password</label>
                        </div>
                        <div className="row mb-4">
                            <div className="col-md-6 d-flex justify-content-center">
                                {/* <div className="form-check mb-3 mb-md-0">
                                    <input className="form-check-input" type="checkbox" value="" id="loginCheck" defaultChecked />
                                    <label className="form-check-label" htmlFor="loginCheck"> Remember me </label>
                                </div> */}
                            </div>
                            {/* <div className="col-md-6 d-flex justify-content-center">

                                <a href="#!">Forgot password?</a>
                            </div> */}
                        </div>
                        <div className="text-center mb-3">
                            <p>Sign in with:</p>
                            <button type="button" className="btn btn-link btn-floating mx-1">
                                <i className="fab fa-facebook-f"></i>
                            </button>

                            <button type="button" className="btn btn-link btn-floating mx-1">
                                <i className="fab fa-google"></i>
                            </button>

                            <button type="button" className="btn btn-link btn-floating mx-1">
                                <i className="fab fa-twitter"></i>
                            </button>

                            <button type="button" className="btn btn-link btn-floating mx-1">
                                <i className="fab fa-github"></i>
                            </button>
                        </div>

                        <button type="submit" className="btn btn-outline-warning ml-auto">Sign in</button>
                        {/*<div className="text-center">
                            <p>Not a member? <a href="#!">Register</a></p>
                        </div> */}
                    </form>
                </div>
                <div className={"tab-pane fade " + register} id="pills-register" role="tabpanel" aria-labelledby="tab-register">
                    <form onSubmit={(e) => {submitSignUp(e)}}>
                        <div className="form-outline mb-4">
                            <input type="text" id="registerNombre" className="form-control" value={nombre} onChange={(e)=>{setnombre(e.target.value)}}/>
                            <label className="form-label" htmlFor="registerNombre" >Nombre</label>
                        </div>


                        <div className="form-outline mb-4">
                            <input type="text" id="registerApellido" className="form-control" value={apellido} onChange={(e)=>{setApellido(e.target.value)}}/>
                            <label className="form-label" htmlFor="registerApellido">Apellido</label>
                        </div>

                        <div className="form-outline mb-4">
                            <input type="email" id="registerEmail" className="form-control" value={emailR} onChange={(e)=>{setEmailR(e.target.value)}}/>
                            <label className="form-label" htmlFor="registerEmail">Email</label>
                        </div>

                        <div className="form-outline mb-4">
                            <input type="password" id="registerContrasena" className="form-control" value={passwordR} onChange={(e)=>{setPasswordR(e.target.value)}}/>
                            <label className="form-label" htmlFor="registerContrasena">Contraseña</label>
                        </div>

                        <div className="form-outline mb-4">
                            <input type="password" id="registerRepeatPassword" className="form-control" value={confirmP} onChange={(e)=>{setConfirmP(e.target.value)}}/>
                            <label className="form-label" htmlFor="registerRepeatPassword">Confirme la Contraseña</label>
                        </div>

                        {/* <div className="form-check d-flex justify-content-center mb-4">
                            <input className="form-check-input me-2" type="checkbox" value="" id="registerCheck" defaultChecked
                                aria-describedby="registerCheckHelpText" />
                            <label className="form-check-label" htmlFor="registerCheck">
                                I have read and agree to the terms
                            </label> 
                        </div>*/}

                        <div className="text-center mb-3">
                            <p>Sign up with:</p>
                            <button type="button" className="btn btn-link btn-floating mx-1">
                                <i className="fab fa-facebook-f text"></i>
                            </button>

                            <button type="button" className="btn btn-link btn-floating mx-1">
                                <i className="fab fa-google"></i>
                            </button>

                            <button type="button" className="btn btn-link btn-floating mx-1">
                                <i className="fab fa-twitter"></i>
                            </button>

                            <button type="button" className="btn btn-link btn-floating mx-1">
                                <i className="fab fa-github"></i>
                            </button>
                        </div>

                        <button type="submit" className="btn btn-outline-warning ml-auto">Sign in</button>
                    </form>
                </div>
            </div>


        </div>
    );
};


export default Login;