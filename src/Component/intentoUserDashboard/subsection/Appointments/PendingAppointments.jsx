import React, {useEffect, uses, useState} from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from '../../Title';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../../../../Redux-actions';
import ModalCancel from '../../../UserProfile/ModalCancel';

function preventDefault(event) {
    event.preventDefault();
  }
export default function PendingAppointments() {
   
  const dispatch = useDispatch()
  const Users = useSelector((state)=> state.users)
  const userApps = useSelector((state) => state.userAppointments)
  const [show,setShow]= useState(false)
  const [input,setInput]=useState()
  useEffect( () => {;
    dispatch(getUsers())
  }, [dispatch]);
  
 
  function handleCancel(e){
    e.preventDefault()
    setInput(e.target.value)  
    setShow(true)
    }
 
  
  console.log('userApps',userApps)
  
  
    return (
      <React.Fragment>
        <Title>Mis Turnos</Title>
        {/* <SearchBar /> */}
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Fecha</TableCell>
              <TableCell>Horario</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Especialidad</TableCell>
              <TableCell>Tipo de Servicio</TableCell>
              <TableCell>Nombre Profesional</TableCell>
              <TableCell>Matrícula</TableCell>
              <TableCell>Reporte Clinico</TableCell>
              <TableCell>Cancelar</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userApps.appointments?.map((app) => (
              <TableRow key={app.id}>
                <TableCell>{`${app?.date[2]}/${app?.date[1]}/${app?.date[0]}`}</TableCell>
                <TableCell>{`${app?.startTime[0]}:${app?.startTime[1]}`}</TableCell>
                <TableCell>{app?.status}</TableCell>
                <TableCell>{app?.ad?.specialty}</TableCell>
                <TableCell>{app?.ad?.serviceType}</TableCell> 
                <TableCell>{app?.ad?.serviceType}</TableCell> {/*nombre prfesional */}
                <TableCell>{(app?.professionalMedicalLicense)?app?.professionalMedicalLicense:null}</TableCell> {/* matricula*/}
                <TableCell>{(app?.medicalRecord)?app?.medicalRecord:null}</TableCell> {/*historia clínica */}
                {/* <TableCell>{(app?.status==='pending')? app?.professionalMedicalLicense: null}</TableCell> */}
                <TableCell>
                {(app?.status==='pending') ? <button value={app?.id} onClick={(e)=>handleCancel(e)}>Cancelar Turno</button>:null}
                {show?<ModalCancel input={input} userEmail={app.email} /* name={user.name} *//>:null}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
         ver mas
        </Link>
        
      </React.Fragment>
    );
}