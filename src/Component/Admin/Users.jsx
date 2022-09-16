import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {filterUsersByAdmin} from "../../Redux-actions/index.js";
import { DataGrid } from '@mui/x-data-grid';




export default function Users( ) {
  const dispatch = useDispatch();
 
  
  const Users = useSelector((state)=> state.topUsers)

  useEffect(() => {
    dispatch(filterUsersByAdmin({appointment: 'users'}))


  }, [dispatch]);

 

 


  let columns = [{ field: 'Nombre' }, { field: 'id' }, { field: 'totalTurnos' },
  { field: 'totalIngreso' }, { field: 'activo' }
 ]


  


  let rows = Users ? Users?.map((user) => {


    return {
      id: user.userEmail,
      Nombre: user.name,
      totalTurnos: user.totalAppointments,
      totalIngreso: user.totalPricesAppointments,
      activo: user.active
      
    }
  }) : [{ id: '1',  Nombre: '-', totalTurnos: '-', totalIngreso: '-', activo: '-' }]

 

  return (
<>
   
      <h2>Consumos de Usuarios</h2>
    <div className='medicalRecorder'>
<div style={{ height: 350, width: "90%" }}>
        <DataGrid
          columns={columns}
          rows={rows}
         
        />
     </div>
     </div>
      
   
    </>

  )
}