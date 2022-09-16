import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { createComment } from "../../Redux-actions";
import { useDispatch } from "react-redux";
import ModalMesage from "./ModalMesage";
import "./FormScore.css";

export default function FormScore({ userEmail }) {
  const [show, setShow] = useState(true);
  const [score, setScore] = useState({
    score: "",
    text: "",
    userEmail: userEmail,
  });
  const [mesage, setMesage] = useState(false);

  const dispatch = useDispatch();

  function handleChange(e) {
    e.preventDefault();
    setScore({
      ...score,
      [e.target.name]: e.target.value,
    });
  }
  console.log("form", score);

  const handleSubmit = () => {
    let payload = {
      comments: score.text,
      rating: score.score,
      userEmail: score.userEmail,
    };
    dispatch(createComment(payload));
    setMesage(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  const handleCancel = () => {
    setShow(false);
  };

  return (
    <>
      <Modal className="ModalMainContainer" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="modalTitle">🤗 PUNTUANOS 🤗</Modal.Title>
        </Modal.Header>
        <br></br>

        <form className="formContainerScore">
          <div className="form-group">
            <label className="labelForm" htmlFor="exampleFormControlSelect1"><strong>10-</strong>  Amo esta App...</label><br/>
            <label  className="labelForm" htmlFor="exampleFormControlSelect1">
              <strong>5-</strong> Amo esta App pero...
            </label><br/>
            <label className="labelForm"  htmlFor="exampleFormControlSelect1">
            <strong>1-</strong>  Amo esta App pero no tanto...
            </label>

            <select
              name="score"
              class="form-control"
              id="exampleFormControlSelect1"
              onChange={(e) => handleChange(e)}
            >
              <option className="labelForm">Elegí puntaje</option>
              <option className="labelForm" value={10}>10</option>
              <option className="labelForm" value={9}>9</option>
              <option className="labelForm" value={8}>8</option>
              <option className="labelForm" value={7}>7</option>
              <option className="labelForm" value={6}>6</option>
              <option  className="labelForm" value={5}>5</option>
              <option className="labelForm" value={4}>4</option>
              <option className="labelForm" value={3}>3</option>
              <option  className="labelForm" value={2}>2</option>
              <option  className="labelForm" value={1}>1</option>
            </select>
          </div>
          <br></br>
          <div class="form-group">
            <label className="labelForm"  for="exampleFormControlTextarea1">
              Dejanos tu comentario
            </label>
            <textarea
              name="text"
              class="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
              onChange={(e) => handleChange(e)}
            ></textarea>
          </div>
          <br></br>
          <Button variant="primary" className="buttonScore" onClick={handleSubmit}>
            Puntuar
          </Button>
        </form>
        {mesage ? <ModalMesage /> : null}
      </Modal>
    </>
  );
}
