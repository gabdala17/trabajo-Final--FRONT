import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { putEditAppointment, modalProfessionalApps, clearTodo, traemeTodo } from '../../Redux-actions';
import { useDispatch } from 'react-redux';

export default function ModalCancelPro({ idApp, medicalLicense }) {
    const [show, setShow] = useState(true);
// console.log('idApp',idApp)
    const dispatch = useDispatch()

    useEffect(() => {
        
        return () => {
            dispatch(clearTodo())
          dispatch(traemeTodo(medicalLicense))
        }
    
      }, [dispatch]);

    const handleClose = () => {
        setShow(false)
        dispatch(modalProfessionalApps(false))
    };

    const handleCancel = () => {
        dispatch(putEditAppointment({ status: 'cancelled' }, idApp))
        setShow(false)
        dispatch(modalProfessionalApps(false))
        //.location.reload()
    }


    return (
        <>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Dar por cancelado este turno
                    </Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cerrar
                    </Button>
                    <Button variant="primary" onClick={handleCancel}>
                        Cancelar este turno
                    </Button>
                </Modal.Footer>

            </Modal>

        </>
    );
}