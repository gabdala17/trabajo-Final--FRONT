import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  clearUserAppointments,
  getProfessionalApps,
  traemeTodo,
  clearTodo,
  modalProfessionalApps,
  modalMedicalRecord,
} from "../../Redux-actions/index.js";
import "./Apointments.css";
import ModalMedicalRecord from "./ModalMedicalRecord";
import { DataGrid } from "@mui/x-data-grid";

export default function PatientHistory({ medicalLicense }) {
  const dispatch = useDispatch();
  const professionalApps = useSelector((state) => state.todo);
  const show = useSelector((state) => state.modalMedicalRecord);

  //const [show, setShow] = useState(false)
  const [checkboxSelection, setCheckboxSelection] = useState(null);
  const [box, setBox] = useState(false);

  useEffect(() => {
    dispatch(traemeTodo(medicalLicense));
    return () => {
      dispatch(clearTodo());
    };
  }, [dispatch]);

  const renderDetailsButton = (params) => {
    return (
      <strong>
        <button
          variant="contained"
          color="primary"
          size="small"
          width="40px"
          style={{ marginLeft: 16 }}
          onClick={(e) => handleOnCellClick(params)}
        >
          Ver Historia Clinica
        </button>
      </strong>
    );
  };

  function handleOnCellClick(params) {
    setCheckboxSelection(params);
    dispatch(modalMedicalRecord(true));
  }

  let columns = [
    { field: "Fecha" },
    { field: "Hora" },
    { field: "Paciente" },
    { field: "Modalidad" },
    { field: "Estado" },
    {
      field: "Ver Historia Clínica",
      renderCell: renderDetailsButton,
      width: 200,
      disableClickEventBubbling: true,
    },
  ];

  let pendingAppointments = professionalApps.appointments?.filter(
    (e) => e.status === "completed"
  );


  let rows = pendingAppointments
    ? pendingAppointments.map((app) => {
        return {
          id: app?.medicalRecord,
          Fecha: app.date[2] + "/" + (Number(app?.date[1])+1).toString() + "/" + app.date[0],
          Hora: app?.startTime[0] + ":" + app?.startTime[1] + "Hs",
          Paciente: app?.user?.name,
          Modalidad: app?.ad?.serviceType,
          Estado: app?.status,

        };
      })
    : [
        {
          id: "1",
          Fecha: "-",
          Hora: "-",
          Paciente: "-",
          Modalidad: "-",
          Estado: "-",
        },
      ];


  return (
    <>
      <div className="profileTitles">Historial de Pacientes </div>
      <div style={{ height: 350, width: "50%" }}>
        <DataGrid
          columns={columns}
          rows={rows}
          renderCell={(e) => renderDetailsButton(e)}
        />
      </div>

      {show ? <ModalMedicalRecord info={checkboxSelection} /> : null}
    </>
  );
}
