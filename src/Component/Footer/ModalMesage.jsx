import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import "./ModalMessage.css";

export default function ModalMesage() {
  const [show, setShow] = useState(true);

  const handleClose = () => {
    setShow(false);
  };

  return (
    <>
      <Modal  show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="modalThankYou">Muchas gracias</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modalThankYouBody">
          Se ha enviado tu valoración a nuestro equipo de trabajo, muchas gracias
          por usar y puntuar nuestra app 💖
        </Modal.Body>
        <Button variant="primary mb-2" onClick={handleClose}>
          cerrar
        </Button>
      </Modal>
    </>
  );
}
