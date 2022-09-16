import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import "react-big-calendar/lib/css/react-big-calendar.css";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
//import { useNavigate } from "react-router-dom";
import es from "date-fns/locale/es/";
//import DatePicker, { DateObject } from "react-multi-date-picker";
//import DatePanel from "react-multi-date-picker/plugins/date_panel";
import {
  getAppointmentsByAdAvailable,
  getProfessionalApps,
  selectedTime,
} from "../../Redux-actions";
import ModalCalendar from "./Modal";
import './AppCalendario.css'



const locales = {
  es: es,
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});
//App calendario es llamado desde adDetail, entrando desde services,
//o desde userProfile, cuando el profesional edita sus turnos.

function AppCalendario({
  professionalMedicalLicense,
  name,
  ad,
  isProfesional,
  professionalEmail,
}) {
  const dispatch = useDispatch();
  //estado que trae turnos disponibles
  const availablesApps = useSelector((state) => state.availablesApps);
  //se va a llamar este estado solo cuando estamos entrando al AppCalendario desde el perfil del usuario, en caso de que quiera editar turnos
  const professionalApps = useSelector(
    (state) => state.professionalAppointments
  );
  //estado global que me dice si selecciono un horario, para renderizar el modal
  const selected = useSelector((state) => state.selectedTime);

  const [eventSelected, setEventSelected] = useState({});


  
  useEffect(() => {
    if (isProfesional) {
      return dispatch(getProfessionalApps(professionalMedicalLicense));
    }
    dispatch(getAppointmentsByAdAvailable(ad.id));
  }, [dispatch]);

  // useEffect(() => {
  //   dispatch(getProfessionalApps(professionalMedicalLicense));
  // }, [dispatch]);

  let es = {
    week: "semana",
  };

  const handleSelected = (e) => {
    setEventSelected(e);
    dispatch(selectedTime(true));
  };

  let appsEvents;
  if (isProfesional) {
    appsEvents = professionalApps.map((app) => {
      return {
        id: app.id,
        title: app.professionalMedicalLicense,
        start: new Date(
          app.date[0],
          app.date[1],
          app.date[2],
          app.startTime[0],
          app.startTime[1]
        ),
        end: new Date(
          app.date[0],
          app.date[1],
          app.date[2],
          app.endTime[0],
          app.endTime[1]
        ),
        status: app.status,
      };
    });
  } else {
    appsEvents = availablesApps.map((app) => {
      return {
        id: app.id,
        title: app.professionalMedicalLicense,
        start: new Date(
          app.date[0],
          app.date[1],
          app.date[2],
          app.startTime[0],
          app.startTime[1]
        ),
        end: new Date(
          app.date[0],
          app.date[1],
          app.date[2],
          app.endTime[0],
          app.endTime[1]
        ),
      };
    });
  }
console.log('selectedTime',selected);
  var user = localStorage.getItem('Email');
  return (
    <>
      <div className="CalendarMainContainer">
        <Calendar
          step={30}
          culture={es}
          timeslots={1}
          views={{ month: true, week: true, day: true }}
          defaultView="month"
          localizer={localizer}
          events={appsEvents}
          onSelectEvent={handleSelected}
          startAccessor="start"
          endAccessor="end"
          min={new Date(1, 1, 1, 8, 0, 0)}
          max={new Date(1, 1, 1, 21, 59, 0)}
          style={{ height: 500, width: 600, margin: "10px",marginBottom:"100px"}}
        />
      </div>
      <div className="modalCalendarContainer">
        {selected && user!==professionalEmail? (
          <ModalCalendar
            info={eventSelected}
            professionalMedicalLicense={professionalMedicalLicense}
            name={name}
            ad={ad}
            isProfesional={isProfesional}
          />
        ):null}
      </div>
    </>
  );
}

export default AppCalendario;

/*   
      not being used
popup
      messages={{
        showMore: total => (
          <div
            style={{ cursor: 'pointer' }}
            onMouseOver={e => {
              e.stopPropagation();
              e.preventDefault();
            }}
          >{`+${total} more`}
          </div>
        ),
      }} */
