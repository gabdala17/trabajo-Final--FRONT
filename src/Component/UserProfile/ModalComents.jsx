import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { putEditAppointment } from '../../Redux-actions';
import { useDispatch } from 'react-redux';
import ModalConfirmComent from './ModalConfirmComent'




export default function ModalComent({userEmail, info }) {
    const [show, setShow] = useState(true);
    const [score , setScore] = useState({
        treatment:'',
        puntuality:'',
        accordance:'',
        userEmail:userEmail
    })
    const [confirmMesage , setConfirmMesage] = useState(false)
    let dispatch = useDispatch()
    console.log('score' , score)
    const handleClose = () => {
        setShow(false)
    };

    function handleChange(e) {
        e.preventDefault();
        setScore({
          ...score,
          [e.target.name]: e.target.value,
        });
      }

    const handleSubmit = (userEmail) => {
        let sumScore = (parseInt(score.treatment) + parseInt(score.puntuality) +parseInt (score.accordance ) )
        let finalScore = parseInt(sumScore ) /3
        console.log('final score', finalScore)
        dispatch(putEditAppointment({ rating:finalScore  , userEmail:score.userEmail }, info?.id))
        setConfirmMesage(true)
    }


    return (
        <>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Queres dejar una puntuacion con respecto a tu ultima consulta?
                    </Modal.Title>
                </Modal.Header>
                    Turno : {info.date} a las : {info.startTime[0] + ':' + info.startTime[1] + 'Hs'}
                {confirmMesage ? <ModalConfirmComent/> : null}
                <form>
                    <div class="form-group">
                        <label for="exampleFormControlSelect1">Evalua el trato del professional *5 Excelente *1 Muy malo</label>
                        <select name='treatment' class="form-control" id="exampleFormControlSelect1"
                        onChange={(e) => handleChange(e)}>
                            <option value={undefined}>...</option>
                            <option value={5}>5</option>
                            <option value={4}>4</option>
                            <option value={3}>3</option>
                            <option value={2}>2</option>
                            <option value={1}>1</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="exampleFormControlSelect1">Puntualidad del profesional</label>
                        <select name='puntuality' class="form-control" id="exampleFormControlSelect1"
                        onChange={(e) => handleChange(e)}>
                            <option value={undefined}>...</option>
                            <option value={5}>5</option>
                            <option value={4}>4</option>
                            <option value={3}>3</option>
                            <option value={2}>2</option>
                            <option value={1}>1</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="exampleFormControlSelect1">Conformidad con el profesional</label>
                        <select name='accordance' class="form-control" id="exampleFormControlSelect1"
                         onChange={(e) => handleChange(e)}>
                            <option value={undefined}>...</option>
                            <option value={5}>5</option>
                            <option value={4}>4</option>
                            <option value={3}>3</option>
                            <option value={2}>2</option>
                            <option value={1}>1</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="exampleFormControlTextarea1">Nota extra</label>
                        <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                    </div>
                    <Button variant="primary" onClick={handleSubmit}>
                        Puntuar
                    </Button>
                </form>
                

            </Modal>

        </>
    );
}