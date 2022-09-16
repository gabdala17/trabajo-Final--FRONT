import React,{useState} from "react";
import Navbar from "../Navbar/Navbar";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import firebaseApp from "../../Credential/index";
import { restoreUser } from "../../Redux-actions/index";
import { useDispatch } from "react-redux";
import "./Recover.css";
import ModalErrors from "../ModalsErrors/ErrorsRouta";

function Recover() {
  //local state
  const [inputRestore, setInputRecover] = React.useState({
    email: "",
    password: "",
  });
  const [modalRecover, setModalRecover]= useState(false)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = getAuth(firebaseApp); //to get the authorization from credentials.
  //const userRestoreMessage = useSelector((state)=> state.userRestore)

  //si trae el mensaje mostrarlo en pantalla!

  function handelOnChange(e) {
    setInputRecover({ ...inputRestore, [e.target.name]: e.target.value });
  }

  //go home/validate to register
  function goRegister() {
    signOut(auth); //log out
    let path = "/home/validate";
    navigate(path);
  }
  function handleSubmit(e) {
    e.preventDefault();

    dispatch(
      restoreUser({
        email: inputRestore.email,
        password: inputRestore.password,
      })
    );
    setModalRecover(true)
  }
  function closeModal(){
    setModalRecover(false)
  }

  return (
    <>
      {modalRecover?<ModalErrors route={"/home/validate"} funcion={closeModal} error={'Su perfil fue recuperado con exito' }/>:null}
      <div className="mainRecoverContainer">
        <h3 className="titleRecover">Usuario deshabilitado temporalmente</h3>
        <h6 className="secondTitleRecover">
          Si desea recuperar su perfil de usuario complete el formulario y haga{" "}
          <strong>click</strong> en el botón enviar luego de completar sus
          datos.
        </h6>
        <Form className="formRecover" onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label className="labelRecoverForm">
              Dirección de Correo
            </Form.Label>
            <Form.Control
              type="email"
              placeholder=" Email"
              name="email"
              value={inputRestore.email}
              onChange={handelOnChange}
            />
            <Form.Text className="text-muted">
              Su información no será compartida.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className="labelRecoverForm">Contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder="Contraseña"
              name="password"
              value={inputRestore.password}
              onChange={handelOnChange}
            />
            <Form.Text className="text-muted">
              No comparta su contraseña.
            </Form.Text>
          </Form.Group>
          <div className="buttonRecoverContainer">
            <Button
              variant="secondary"
              className="registerButton"
              onClick={goRegister}
            >
              Registrarse
            </Button>
            <Button variant="primary" type="submit" className="submitButton">
              Reactiva tu perfil
            </Button>
          </div>
        </Form>
        <h6 className="secondTitleRecover">
          *En caso que desee registrarse con otro usuario haga click en el boton{" "}
          <span>registrarse</span> que lo redireccionará a la página de
          registro.
        </h6>
      </div>
    </>
  );
}

export default Recover;
