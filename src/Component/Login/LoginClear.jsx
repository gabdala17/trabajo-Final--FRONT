import React, { useState } from "react";
import { app } from "../../Credential/firebase";
import firebaseApp from "../../Credential/index";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ModalForgotPsw from "./ModalForgotPsw";
import Alert from 'react-bootstrap/Alert';
import "./Login.css";
import { FcCheckmark } from "react-icons/fc"
import {
  getAuth,
  signInWithRedirect,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth"
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getUsersById } from "../../Redux-actions";
import { useNavigate, Link } from "react-router-dom";
import { validate } from "./validate";
import ModalErrors from "../ModalsErrors/ErrorsRouta";

const auth = getAuth(firebaseApp);

const googleProvider = new GoogleAuthProvider();



function LoginClear(props) {
  const [isRegistrando, setIsRegistrando] = React.useState(false);
  const [isLoading, setIsLoading] =useState(true)
  const [user, setUsuario] = useState(null);
  const [isRight, setRight] = useState(false)
  const dispatch=useDispatch()
  const navigate= useNavigate()
  let User = localStorage.getItem('Email');
  const [errors, setErrors] = useState({ 
    email: "",
    password: "",
  })

  console.log('loginUser',User)

  useEffect(()=>{

    // props.seprops.setState(false)
     setIsLoading(true)
    app.auth().onAuthStateChanged((usuarioFirebase) => {
        console.log("ya tienes sesión iniciada con:", usuarioFirebase);
        usuarioFirebase !== null && localStorage.setItem("Email", usuarioFirebase?.email);
        setUsuario(usuarioFirebase);
        usuarioFirebase !==null &&
        dispatch(getUsersById(usuarioFirebase?.email.toLowerCase()))
    })

  
    
},[])
  const iniciarSesion = (email, password) => {
    app
      .auth()
      // console.log('auth', app)
      .signInWithEmailAndPassword(email, password)
      .then((usuarioFirebase) => {
        console.log("sesión iniciada con:", usuarioFirebase.user);
        usuarioFirebase !== null && localStorage.setItem("Email", usuarioFirebase?.user?.email);
        // usuarioFirebase === null 
        console.log('usuarioFirebase?.email',usuarioFirebase.user.email);
        props.setUsuario(usuarioFirebase);
        
        
      })      
      .catch((e)=>{
        setRight(true) 
        console.log('error', e)
        
      })

  };

  function handleChange(e){
    setErrors(validate({
      [e.target.name]: e.target.value
    }))

  }
  

  const submitHandler = (e) => {
   
    e.preventDefault();
    const email = e.target.emailField.value;
    const password = e.target.passwordField.value;
    localStorage.setItem("Email", email)
    if (!isRegistrando) {
      iniciarSesion(email, password);
    }
    navigate('/home/profile')
  };
  const submitHandlerGoogle= (e) => {
    const auth = getAuth();
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // ...
         navigate('/')
      })    
  };
  const submitHandlerRegister=(e)=>{
    navigate('/home/register')
  }
  console.log('error.páss', User);
  return (
    <>
     
      <div>
        {
          isRight&&
          <ModalErrors error={'Usuario o contraseña incorrecta'} />   
                }
      </div>,
    <div className="ValidateCOntainer">
      <div className="Validate">
      <h2 className="ValidateTitle">  Inicia Sesión </h2>
      <Form onSubmit={submitHandler} className="formContainer mb-2">
          {/* mail */}
          <Form.Group className="mb-3">
            <Form.Label htmlFor="emailField">Correo*: </Form.Label>
            <Form.Control
              type="email" 
              id="emailField"
              name="email"
              value={User}
              onChange={(e) => handleChange(e)}    
              required
            />
            {/* {errors.email && (<Alert variant='warning' className="error" >{errors.email}</Alert>)} */}
            
          </Form.Group>

          {/* password */}
          <Form.Group className="mb-3">
            <Form.Label htmlFor="passwordField">Password*: </Form.Label>
            <Form.Control
              type="password" 
              id="passwordField"
              name="password"
              onChange={(e) => handleChange(e)}
              required
              
            />
            {errors.password && (<Alert variant='warning' className="error" >{errors.password}</Alert>)}
            
          </Form.Group>
          {
            
            <div className="formButtons">
              {/* Submit form button */}
              <Button variant="success" type="submit">
                iniciar sesion
              </Button>
            </div>
          }
          
              {/* Submit form button */}
              
           
          </Form>
            <div className="registerNforgottenButtons">
          <ModalForgotPsw />
          <Button
            variant="info"
            size="sm"
            type="submit"
            onClick={(e) => submitHandlerGoogle(e)}
          >
            Accede con Google
          </Button>
          
          <Button 
          onClick={(e) => submitHandlerRegister(e)  }    
          >
            Registrarme
          </Button>
          </div>
          </div>

      
    </div>
    </>
  );
}

export default LoginClear;
