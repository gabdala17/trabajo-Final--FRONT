import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  getUsers,
  clearTodo,
  modalProfessionalApps,
} from "../../Redux-actions/index.js";
import ModalOptions from "./ModalOptions";
import { DataGrid } from "@mui/x-data-grid";
import SearchBar from "./SearchBar.jsx";

export default function AllUsers() {
  const dispatch = useDispatch();
  const [checkboxSelection, setCheckboxSelection] = useState(null);
  const modalProfApps = useSelector((state) => state.modalProfessionalApps);
  const Users = useSelector((state) => state.allUsers);

  console.log(Users);

  useEffect(() => {
    dispatch(getUsers());
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
          Opciones
        </button>
      </strong>
    );
  };

  function handleOnCellClick(params) {
    setCheckboxSelection(params);
    dispatch(modalProfessionalApps(true));
  }

  let columns = [
    { field: "Nombre", width: "200" },
    { field: "rol" },
    { field: "Mail", width: "200" },
    { field: "Telefono", width: "200" },
    { field: "ranting" },
    { field: "activo" },
    { field: "eliminado" },
    {
      field: "Opciones",
      renderCell: renderDetailsButton,
      width: 300,
      disableClickEventBubbling: true,
    },
  ];

  let rows = Users
    ? Users.map((user) => {
        return {
          id: user.id,
          rol: user.rol,
          Nombre: user.name,
          Mail: user.email,
          Telefono: user.phone,
          ranking: user.professional?.ranking,
          activo: user.active,
          eliminado: user.deletedByAdmin,
        };
      })
    : [
        {
          id: "1",
          Nombre: "-",
          Mail: "-",
          Telefono: "-",
          ranting: "-",
          activo: "-",
          eliminado: "-",
        },
      ];

  return (
    <>
      <h2>Todos los usuarios</h2>
      <SearchBar />

      <div className="medicalRecorder"></div>

      <SearchBar />

      <div style={{ height: 350, width: "90%" }}>
        <DataGrid
          columns={columns}
          rows={rows}
          renderCell={(e) => renderDetailsButton(e)}
        />
      </div>

      {modalProfApps ? <ModalOptions params={checkboxSelection} /> : null}
    </>
  );
}
