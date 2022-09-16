import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from 'react-redux';
import ModalAbsent from './ModalAbsent'
import ModalCancelPro from './ModalCancelPro';
import { useNavigate } from "react-router-dom";
import { modalProfessionalApps, traemeTodo, clearTodo } from "../../Redux-actions/index.js";

export default function ModalOptions({ appointment, medicalLicense }) {
    const [show, setShow] = useState(true);
    const [cancel , setCancel] = useState(false);
    const [absent , setAbsent] = useState(false);
    const [readyApp , setReacdyApp] = useState(false);
    let navigate = useNavigate()

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

    const handleCancelAppointment = () => {
        setCancel(true)
        
    }

    const hanldeReadytowork = () => {
        navigate('/appointment/id/'+appointment.row?.id)
        dispatch(modalProfessionalApps(false))
    }

    const handleAbsentPatient = () => {
        setAbsent(true)
        
    }

console.log(appointment.row?.id)
    return (
        <>
            {absent ? <ModalAbsent idApp={appointment.row?.id} medicalLicense={medicalLicense} /> : null}
            {cancel ? <ModalCancelPro idApp={appointment.row?.id} medicalLicense={medicalLicense}/> : null }
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Opciones del turno {appointment.row?.Modalidad}
                    </Modal.Title>
                </Modal.Header>
                -Con el paciente : {appointment.row?.Paciente}
                <br></br>
                -El dia : {appointment.row?.Fecha}
                <br></br> 
                -A la hora : {appointment.row?.Hora}
                <Modal.Footer>
                    <Button variant="secondary" onClick={hanldeReadytowork}>
                        Empezar consulta
                    </Button>
                    <Button variant="secondary" onClick={handleAbsentPatient}>
                        Paciente Ausente
                    </Button>
                    <Button variant="secondary" onClick={handleCancelAppointment}>
                        Cancelar este turno
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}