import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { putEditAppointment, modalProfessionalApps, traemeTodo, clearTodo} from '../../Redux-actions';
import { useDispatch } from 'react-redux';

export default function ModalAbsent({ idApp, medicalLicense }) {
    const [show, setShow] = useState(true);

    const dispatch = useDispatch()

    useEffect(() => {
        
        return () => {
          dispatch(clearTodo())
          dispatch(traemeTodo(medicalLicense))
        }
    
      }, [dispatch]);
    const handleClose = () => {
        setShow(false)
    };

    const handleCancel = () => {
        dispatch(putEditAppointment({ status: 'absent' }, idApp))
        setShow(false)
        dispatch(modalProfessionalApps(false))
        //window.location.reload()
    }


    return (
        <>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Dar por ausente al paciente
                    </Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cerrar
                    </Button>
                    <Button variant="primary" onClick={handleCancel}>
                        Ausente
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}