import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { putEditAppointment, showModal } from '../../Redux-actions';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";

export default function ModalCancel({medicalRecord, idApp}) {
  const [show, setShow] = useState(true);
  let navigate = useNavigate()

  const dispatch=useDispatch()

  const handleClose = () =>{
    setShow(false)
    dispatch(showModal(false))
    };
  
    const handleCancel=()=>{
      dispatch(putEditAppointment({medicalRecord:medicalRecord},idApp))
      setShow(false)
      dispatch(showModal(false))
      navigate('/home/validate')
    }
 

  return (
    <>

<Modal show={show} onHide={handleClose}>
       <Modal.Header closeButton>
       <Modal.Title>
          Completo el turno llenando la historia clinica?
        </Modal.Title>
       </Modal.Header>
       <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          no
        </Button>
        <Button variant="primary" onClick={handleCancel}>
          si
        </Button>
      </Modal.Footer>
      
     </Modal>
    
    </>
  );
}