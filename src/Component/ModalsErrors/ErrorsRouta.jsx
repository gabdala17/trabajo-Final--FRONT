import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';

export default function ModalErrors({error, route, funcion}) {
  const [show, setShow] = useState(true);
  let navigate = useNavigate()

  const handleClose = () =>{
    if(funcion){
      funcion()
    }
  
    if(route){
      navigate(route)
    }
    if(funcion && route){
      funcion();
      navigate(route)
    }
    setShow(false)};
  const handleShow = () => setShow(true);

  return (
    <>

      <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton/>
   
        <Modal.Body>{error}</Modal.Body>

      </Modal>
    </>
  );
}