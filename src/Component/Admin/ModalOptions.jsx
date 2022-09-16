import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from 'react-redux';
import { getUsers, deleteByAdmin, forgivenByAdmin, designeAdmin, degredeAdmin } from "../../Redux-actions/index.js";
import { modalProfessionalApps } from "../../Redux-actions/index.js";

export default function ModalOptions(params) {
    const [show, setShow] = useState(true);
    const [secure,setSecure]= useState(false)
    console.log(params,"soyparams");

    const dispatch = useDispatch()
useEffect(() => {
    
    return()=>{

      dispatch(getUsers())
    }

  
}, [])


    const handleClose = () => {
        setShow(false)
        dispatch(modalProfessionalApps(false))
    };

 
    function handleDelete(){
        
        dispatch(deleteByAdmin(params.params.id))
        dispatch(modalProfessionalApps(false))
        setSecure(false)
      }
      function handleForgive(){
       
        dispatch(forgivenByAdmin(params.params.row.Mail))
        dispatch(modalProfessionalApps(false))
      }
      
      function handleDesigneAdmin(){
        
        dispatch(designeAdmin(params.params.id))
        dispatch(modalProfessionalApps(false))
      }
      function handleDegredeAdmin(){
       
        dispatch(degredeAdmin(params.params.id))
        dispatch(modalProfessionalApps(false))
      }
      function handleSecure(){
        setSecure(true)
      }
      


    return (
        <>
            
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Opciones {params.params.row?.Nombre}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                {params.params.row?.eliminado=== true?
                <Button variant="secondary" onClick={handleForgive}>
                Restaurar Usuario
            </Button>: 
                    <Button variant="danger" onClick={handleSecure}>
                        Eliminar 
                    </Button>
            }
                    {params.params.row?.rol==="admin" ? 
                    <Button variant="secondary" onClick={handleDegredeAdmin}>
                        Rol Usuario
                    </Button>:
                    <Button variant="secondary" onClick={handleDesigneAdmin}>
                        Rol Admin
                    </Button>
                
                    }
                        
                </Modal.Footer>
            </Modal>
            <Modal show={secure} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                         Eliminar {params.params.row?.Nombre}?
                    </Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                
                    <Button variant="danger" onClick={handleDelete}>
                        Eliminar 
                    </Button>
          
                
                
                </Modal.Footer>
            </Modal>
        </>
    );
}