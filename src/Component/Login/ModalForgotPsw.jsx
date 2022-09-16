
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import {sendPasswordResetEmail,getAuth} from "firebase/auth";
import firebaseApp from "../../Credential/index";


function ModalForgotPsw() {
    const [show, setShow] = useState(false);
    const [emailInput,setEmailInput]= useState()

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const auth = getAuth(firebaseApp);
    

 //reset password  PASAR LOGICA AL MODAL OLVIDO CONTRASEÑA
 const resetPassword = (emailInput) => sendPasswordResetEmail(auth, emailInput)

 //handle on change
 const handleOnChange = (e)=>{
    setEmailInput(e.target.value)
 }

 const handleRessetPassword = async  () =>{
   try {
     await resetPassword(emailInput)
     //crear MODAL con correo electronico y send
     return alert("Enviamos un correo para reestablecer tu contraseña")
     
   } catch (error) {
     return alert("Error,aca irá un modal de error")
     
   }
 }



  return (
    <>
      <Button variant="danger" size="sm" onClick={handleShow}>
        ¿Olvido Contraseña?
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Recuperá tu contraseña</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Escribí tu mail</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                autoFocus
                
                onChange={handleOnChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" size="sm" onClick={handleClose}>
            Cerrar
          </Button>
          <Button 
          variant="primary"  
          size="sm"
          onClick={handleRessetPassword}>
            Enviar
          </Button>

        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ModalForgotPsw