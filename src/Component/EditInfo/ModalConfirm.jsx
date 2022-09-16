import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";


export default function ModalConfirm() {
  const [show, setShow] = useState(true);
    let navigate = useNavigate()
  const handleClose = () => {
    setShow(false);
    navigate('/home/validate')
    Window.location.reload('/home/validate')
    
  };

  return (
    <>
      <Modal  show={show} >
        <Modal.Header closeButton>
          <Modal.Title className="modalThankYou">Has actualizado tu informacion de usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modalThankYouBody">
          Mucha suerte con tu nueva apariencia 👍
        </Modal.Body>
        <Button variant="primary mb-2" onClick={handleClose}>
          Ir al Perfil
        </Button>
      </Modal>
    </>
  );
}