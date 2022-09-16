import React from "react";
import ProfileDetail from "./ProfileDetails/ProfileDetails";
import Appointments from "./Appointments/Appointments";
import PendingAppointments from "./Appointments/PendingAppointments";
import { SECTIONS, SECTIONS_TITLE } from "./constants"
export default function Subsection({selectedSection}) {
  console.log('selectedSection',selectedSection)
  console.log('type selectedSection',typeof selectedSection)
  debugger;
    return (
        <>
          {(selectedSection === 'MI PERFIL')? <ProfileDetail/>: (selectedSection === 'MIS TURNOS')?<Appointments/>:(selectedSection === 'MIS TURNOS PENDIENTES')? <PendingAppointments/>: <p>Estas locaa!!</p>}
          
        </>
    )
}