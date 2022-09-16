import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
//import ModalMedicalRecord from './ModalMedicalRecord';
import { useSelector, useDispatch } from 'react-redux';
import { getUserApps, clearUserAppointments } from '../../Redux-actions';




export default function Appointments({ userEmail, name }) {
  const dispatch = useDispatch();
  const userApps = useSelector((state) => state.userAppointments);

  useEffect(() => {
    dispatch(getUserApps(userEmail));
    return () => {
      dispatch(clearUserAppointments());
    };
  }, [dispatch]);

  

  let columns = [
    { field: "Fecha" },
    { field: "Hora" },
    { field: "Modalidad" },
    { field: "Estado" },
    { field: "Medico" },
    { field: "Especialidad" },
  ];

  let userNotPendingApps = userApps.filter(
    (e) =>
      e.status === "completed" ||
      e.status === "cancelled" ||
      e.status === "absent"
  );

  let rows = userNotPendingApps
    ? userNotPendingApps?.map((app) => {
        return {
          id: app?.id,
          Fecha: app?.date[2] + "/" + app?.date[1] + "/" + app?.date[0],
          Hora: app?.startTime[0] + ":" + app?.startTime[1] + "Hs",
          Especialidad: app?.ad?.specialty,
          Medico: "Dr/a " + app?.professional?.user?.name,
          Modalidad: app?.ad?.serviceType,


          Estado: app?.status,
        };
      })
    : [
        {
          id: "1",
          Fecha: "-",
          Hora: "-",
          Epecialidad: "-",
          Medico: "-",
          Modalidad: "-",
          Estado: "-",
        },
      ];


  return (
    <>
      <div className="profileTitles">Historial de Atención</div>
     
      <div style={{ height: 350, width: "50%" }}>
        <DataGrid columns={columns} rows={rows} />
      </div>
    </>
  );
}
