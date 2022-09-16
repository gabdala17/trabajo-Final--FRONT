import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from 'react-redux';
import { getUsersById } from "../../Redux-actions/index.js";


export default function ModalDelete({idUser, funcion, idAd, state,setState}) {
    const [show, setShow] = useState(false);
    
  

    const dispatch = useDispatch()
useEffect(() => {
    
    return()=>{

      dispatch(getUsersById(idUser))
    }

  
}, [])


    const handleClose = () => {
        setShow(false)
        setState(false)
      
    };
    const handleSecure = () => {
        funcion(idAd)
        setShow(true)
        
      
    };

 

    return (
        <>
            
            <Modal show={state} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Seguro quieres eliminar este anuncio?
                    </Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                
                    <Button variant="danger" onClick={handleSecure}>
                        Eliminar 
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Cancelar
                    </Button>
            
                </Modal.Footer>
            </Modal>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                       Anuncio eliminado con exito!
                    </Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                
            
                </Modal.Footer>
            </Modal>
          
          
          
                
        </>
    );
}