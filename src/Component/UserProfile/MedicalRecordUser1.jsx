import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import ModalMedicalRecord from "./ModalMedicalRecord";
import { useSelector, useDispatch } from "react-redux";
import {
  getUserApps,
  clearUserAppointments,
  modalMedicalRecord,
} from "../../Redux-actions";

//por las dudas pongo esta linea, para ver si me toma el cambio del nombre del archivo
//no lo quiere tomar, habria que eliminar el archivo, subirlo sin ese archivo a git y volverlo a crear
export default function MedicalRecordUser({ userEmail }) {
  const dispatch = useDispatch();
  const userApps = useSelector((state) => state.userAppointments);
  const show = useSelector((state) => state.modalMedicalRecord);
  console.log(userApps);
  //const [show,setShow]= useState(false)
  const [medicalRecord, setMedicalRecord] = useState();
  const [checkboxSelection, setCheckboxSelection] = useState();

  useEffect(() => {
    dispatch(getUserApps(userEmail));
    return () => {
      dispatch(clearUserAppointments());
    };
  }, [dispatch]);

  const renderHistoryRecordButton = (params) => {
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
    { field: "Especialidad" },
    { field: "Modalidad" },
    { field: "Medico" },
    { field: "Fecha" },
    {
      field: "Ver Historia Clinica",
      renderCell: renderHistoryRecordButton,
      width: 200,
      disableClickEventBubbling: true,
    },
  ];

  let userAppsCompleted = userApps?.filter((e) => e.status === "completed");
  //console.log("holaaaa", checkboxSelection);
  let rows = userAppsCompleted
    ? userAppsCompleted.map((app) => {
        return {
          id: app?.medicalRecord,
          Fecha: app.date[2] + "/" + (Number(app?.date[1])+1) + "/" + app.date[0],
          Especialidad: app.ad?.specialty,
          Modalidad: app.ad?.serviceType,
          Medico: "dr/a " + app.professional?.user?.name,
        };
      })
    : [{ id: 1, Especialidad: "-", Modalidad: "-", Medico: "-", Fecha: "-" }];
 //console.log(checkboxSelection);
  return (
    <>
      <div className="profileTitles">Historia Clínica</div>

      {show ? <ModalMedicalRecord info={checkboxSelection} /> : null}
      <div style={{ height: 350, width: "50%" }}>
        <DataGrid columns={columns} rows={rows} width />
      </div>
    </>
  );
}
