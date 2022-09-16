import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from 'react-redux';
import parse from 'html-react-parser'
import { modalMedicalRecord } from '../../Redux-actions';

export default function ModalMedicalRecord({ info }) {
    const [show, setShow] = useState(true);

    const dispatch = useDispatch()

    const handleClose = () => {
        setShow(false)
        dispatch(modalMedicalRecord(false))
    };

  /*   const handleCancel = () => {
        setShow(false)
        dispatch(modalMedicalRecord(false))
    } */


    return (
        <>

            <Modal show={show} onHide={handleClose} >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Historia Clinica
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        
                    </div>
                    <div>
                        {parse(info.id)}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Cerrar
                    </Button>
                </Modal.Footer>

            </Modal>

        </>
    );
}