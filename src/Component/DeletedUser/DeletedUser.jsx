import React from "react";
import Navbar from "../Navbar/Navbar";
import Button from "react-bootstrap/Button";
import { signOut, getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./DeletedUser.css";
import firebaseApp from "../../Credential/index";


function DeletedUser() {

  const navigate = useNavigate();
  const auth = getAuth(firebaseApp);

 
  function goRegister() {
    signOut(auth); //log out
    let path = "/home/validate";
    navigate(path);
  }


  return (
    <>
   
      <div className="mainRecoverContainer">
        <h3 className="titleRecover">Usuario deshabilitado por el Administrador</h3>
        <h6 className="secondTitleRecover">
          Tu Usuario no cumplia con las politicas de nuestro sitio y ha sido dado de baja
        </h6>
          <div className="buttonRecoverContainer">
            <Button
              variant="secondary"
              className="registerButton"
              onClick={goRegister}
            >
              volver al Inicio
            </Button>
          </div>
        <h6 className="secondTitleRecover">
          *En caso que desee registrarse con otro usuario haga click en el boton{" "}
          <span>Volver al inicio</span> que lo redireccionará a la página de
          registro.
        </h6>
      </div>
    </>
  );
}

export default DeletedUser;