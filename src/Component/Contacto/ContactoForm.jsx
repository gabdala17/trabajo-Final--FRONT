import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import emailjs from '@emailjs/browser';
import './Contacto.css';

function ContactoForm() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //mail aqui
  function sendEmail (e){
    e.preventDefault()
   
    emailjs.sendForm('service_5qp9enm','template_cktuhyc',e.target,'jeekxUefyAsuBBz5j')
    .then(res => console.log(res))
    .catch(e=> console.log(e))

  }
  

  
  return (
    <>
      

     <Button  onClick={handleShow} className='mainButton' >
        Formulario
      </Button>

      <Modal show={show} onHide={handleClose}>
        
        <Modal.Header closeButton>
          <Modal.Title>Formulario de Contacto</Modal.Title>
        </Modal.Header>

        <Modal.Body>

          <Form onSubmit={(e) => sendEmail(e)}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email </Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="nombre@ejemplo.com"
                autoFocus
              />
              <Form.Label>Nombre </Form.Label>
              <Form.Control
                type="text"
                
                placeholder="Tu nombre aquí..."
                name="name"
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Escribí tu consulta.</Form.Label>
              <Form.Control as="textarea" rows={3}  name="message"/>
            </Form.Group>
            <Button variant="secondary" onClick={handleClose}>
              Cerrar
            </Button>
            <Button variant="primary" onClick={handleClose} type="submit">
              Enviar
            </Button>
          </Form>

        </Modal.Body>
        
      </Modal>
    </>
  );
}

export default ContactoForm
