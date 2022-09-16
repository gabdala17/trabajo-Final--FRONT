import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; //fijarse si es neceario
import {
  getProfessionalById,
  getUsersById,
  putEditAppointment,
  selectedTime,
  getAppointmentsById,
  deleteAppointment,
} from "../../Redux-actions";
import ModalPayment from "../Home/ModalPayment";
import ModalErrors from "../ModalsErrors/ErrorsRouta";
import "./AppCalendario.css";



export default function ModalCalendar({
  isProfesional,
  info,
  professionalMedicalLicense,
  adId,
  name,
  ad,
}) {
  const [show, setShow] = useState(true);
  const [pay, setPay] = useState(false);
  const [validate, setValidate] = useState(false);
  const [CompleteRegister, setCompleteRegister] = useState(false);
  const userDetail = useSelector((state) => state.userDetail);
  const appointmentInfo = useSelector((state) => state.appointmentInfo);
  const dispatch = useDispatch();
  const userEmail = localStorage.getItem("Email");
  useEffect(() => {
    dispatch(getUsersById(userEmail));
    dispatch(getAppointmentsById(info.id));
  }, [dispatch]);

  let navigate = useNavigate();

  console.log("Modal", info);
  let idApp = info.id;
  console.log("info.id", idApp);
  let date = info.start.getDate();
  let month = info.start.getMonth();
  let hr = info.start.getHours();
  let min = info.start.getMinutes();

  let Months = [
    "enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
    "julio",
    "agosto",
    "septiembre",
    "noviembre",
    "diciembre",
  ];

  //  console.log('soy dia', dia)
  //  console.log('soy mes', mes)
  //  console.log('soy hr', hr)
  //  console.log('soy min', typeof min)

  //userEmail

  const handleClose = () => {
    setShow(false);
    dispatch(
      putEditAppointment({ status: "available", userEmail: userEmail }, idApp)
    );
    dispatch(selectedTime(false));
  };
  const handleonclick = () => {
    if (userEmail === null) {
      return setValidate(true);
    }
    // else if(!userDetail.rol || !userDetail.name || !userDetail.identification || !userDetail.idImage || !userDetail.country || !userDetail.city || !userDetail.address){
    //   return setCompleteRegister(true)
    // }
    setPay(true);

    dispatch(
      putEditAppointment({ status: "booked", userEmail: userEmail }, idApp)
    );
  };

  const handleCancel = () => {
    dispatch(deleteAppointment(idApp));
    dispatch(selectedTime(false));
    window.location.reload(true);
    //navigate(`/calendar/${ad.id}`)
  };

  const handleShow = () => setShow(true);
  const professionalProfile = useSelector((state) => state.professionalProfile);

  useEffect(() => {
    dispatch(getProfessionalById(professionalMedicalLicense));
  }, [dispatch]);

  return (
    <>
      {!isProfesional ? (
        <Modal className="modalTurnoMainContainer" show={show} onHide={handleClose}>
          <Modal.Header closeButton></Modal.Header>
          <Modal.Title>
            Usted se atendera con: {professionalProfile.user?.name}
          </Modal.Title>
          <Modal.Body className="modalTurnoMainContainer">
            <div>Especialidad: {appointmentInfo?.ad?.specialty}</div>
            <div>
              El día: {date} de {Months[month].toUpperCase()}
            </div>
            <div>
              {" "}
              a la hora: {hr}:{min === 0 ? (min = "00") : min}{" "}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={handleonclick}>
              Confirmar
            </Button>
            {pay ? (
              <ModalPayment info={idApp} adId={adId} name={name} ad={ad} />
            ) : null}
            {validate ? (
              <ModalErrors
                error={
                  "Por favor complete sus datos para poder solicitar un turno"
                }
                route={"/home/validate"}
              />
            ) : null}
          </Modal.Footer>
        </Modal>
      ) : (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              {professionalProfile.user?.name}, queres cancelar este turno?
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>especialidad: {appointmentInfo?.ad?.specialty}</p>
            <p>
              el día: {date} de {Months[month].toUpperCase()}
            </p>
            <p>
              {" "}
              a la hora: {hr}:{min === 0 ? (min = "00") : min}{" "}
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cerrar
            </Button>
            <Button variant="primary" onClick={handleCancel}>
              Cancelar este turno
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
}
