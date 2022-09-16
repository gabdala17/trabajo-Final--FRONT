import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  clearUserAppointments,
  getProfessionalApps,
  traemeTodo,
  clearTodo,
  modalProfessionalApps,
} from "../../Redux-actions/index.js";
import "./Apointments.css";
import ModalCancelPro from "./ModalCancelPro";
import { DataGrid } from "@mui/x-data-grid";

export default function ProfessionalAvailable({
  medicalLicense,
  userEmail,
  name,
}) {
  const dispatch = useDispatch();
  const professionalApps = useSelector((state) => state.todo);
  const modalProfApps = useSelector((state) => state.modalProfessionalApps);
  const [show, setShow] = useState(false);
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
          Cancel
        </button>
      </strong>
    );
  };

  function handleOnCellClick(params) {
    setCheckboxSelection(params);
    dispatch(modalProfessionalApps(true));
  }

  let columns = [
    { field: "Fecha" },
    { field: "Hora" },
    { field: "Paciente" },
    { field: "Modalidad" },
    { field: "Estado" },
    {
      field: "Cancelado",
      renderCell: renderDetailsButton,
      width: 200,
      disableClickEventBubbling: true,
    },
  ];

  let pendingAppointments = professionalApps.appointments?.filter(
    (e) => e.status === "available"
  );

  let rows = pendingAppointments
    ? pendingAppointments.map((app) => {
        return {
          id: app?.id,
          Fecha: app.date[2] + "/" + (Number(app?.date[1])+1).toString()+ "/" + app.date[0],
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
      <div className="profileTitles">Turnos disponibles </div>
      <div style={{ height: 350, width: "50%" }}>
        <DataGrid
          columns={columns}
          rows={rows}
          renderCell={(e) => renderDetailsButton(e)}
        />
        </div>


      {modalProfApps ? <ModalCancelPro idApp={checkboxSelection.row?.id} medicalLicense={medicalLicense} /> : null}


      
      </>
    );
  }

