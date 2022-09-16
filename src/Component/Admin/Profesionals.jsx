import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {filterprofessionalsByAdmin} from "../../Redux-actions/index.js";
import { DataGrid } from '@mui/x-data-grid';




export default function Profesionals( ) {
  const dispatch = useDispatch();
  
  const Users = useSelector((state)=> state.topProfessionals)
console.log(Users);
  useEffect(() => {
    dispatch(filterprofessionalsByAdmin({appointment: 'professional'}))

    

  }, [dispatch]);

 

 


  let columns = [{ field: 'Nombre' }, { field: 'Mail' }, { field: 'totalTurnos' },
  { field: 'totalIngreso' }, { field: 'activo' }
  ]


  


  let rows = Users ? Users?.map((user) => {


    return {
      id: user.userEmail,
      Nombre: user.name,
      Mail: user.userEmail,
      totalTurnos: user.totalAppointments,
      totalIngreso: user.totalPricesAppointments,
      activo: user.active
      

    }
  }) : [{ id: '1',  Nombre: '-', Mail: '-', totalTurnos: '-', totalIngreso: '-', activo: '-' }]

 

  return (
<>
   
    <h2>Ventas totales de los Profesionales </h2>

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