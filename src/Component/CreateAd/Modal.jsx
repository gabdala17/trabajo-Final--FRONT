import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import CreateAd from '.';
import { getProfessionalById } from '../../Redux-actions';
import ModalPayment from '../Home/ModalPayment';

export default function ModalCreateAdd({user}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" size = "sm" onClick={handleShow}>
        Crear Anuncio
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Tu Anuncio</Modal.Title>
        </Modal.Header>
        <Modal.Body> <CreateAd user={user}/></Modal.Body>
      </Modal>
    </>
  );
}