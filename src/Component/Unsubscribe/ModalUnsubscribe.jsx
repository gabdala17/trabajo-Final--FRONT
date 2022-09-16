import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { useDispatch} from "react-redux";
import FormLabel from "react-bootstrap/esm/FormLabel";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import './ModalUnsubscribe.css'
import { Link, useNavigate } from "react-router-dom";
import {deleteUserByID, clearUserDetail } from '../../Redux-actions/index'
import { getAuth, signOut } from "firebase/auth";
import firebaseApp from "../../Credential/index";


function ModalUnsubscribe(props) {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth(firebaseApp);
  const dispatch = useDispatch()


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function handleSubmit (e){
    e.preventDefault();
    dispatch (deleteUserByID(props.user.id));
    dispatch(clearUserDetail());
    signOut(auth);
    let path = "/home/validate"
    navigate(path)
  }
  

  return (
    <>
      <Button onClick={handleShow} size="sm" className="bajaButton">
        ¿Darse de baja?
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton className="headerBaja">
          <Modal.Title className="modalTitleBaja">
            ¿Seguro quieres la baja?
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <FormLabel className="formLabelBaja">
                Recuerde que su desvinculación de la aplicación tendrá
                consecuencias directas sobre la visualización del contenido como
                así también su historial médico y sus citas reservadas.
                Cualquier Consulta no dude en comunicarse con el área de{" "}
                <Link to="/">soporte</Link> al pie de página.
              </FormLabel>
            </Form.Group>

            <Button variant="secondary" onClick={handleClose}>
              No
            </Button>
            <Button
              variant="danger"
              onClick={handleClose}
              type="submit"
              className="yesButtonBaja"
            >
              Darme de baja
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModalUnsubscribe;
