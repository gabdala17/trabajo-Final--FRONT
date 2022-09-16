import React, { useState } from 'react';
import { useEffect, } from "react";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import parse from 'html-react-parser'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {useParams} from 'react-router-dom'
import ModalConfirma from './ModalConfirma'
import { getAppointmentsById, showModal, putEditAppointment} from "../../Redux-actions";
import MedicalRecordUser from '../UserProfile/MedicalRecordUser1';

function MedicalRecordLog() {
  //const [show, setShow]= useState(false)
  const [log, setLog]= useState('')
  const [hClinica, setHClinica] = useState(false)
  
  let navigate = useNavigate()
  
  const dispatch = useDispatch()
  const {idApp} = useParams()
  console.log('id',idApp);
  
  function getAge(date){
    let age= 
    Math.floor((new Date() - new Date(date).getTime()) / 3.15576e+10)
    return age
  }
  
  let appInfo = useSelector(state=>state.appointmentInfo)
  let show = useSelector(state=>state.showModal)
  useEffect(() => {
    console.log('llegue');
   dispatch(getAppointmentsById(idApp))
   
  },[dispatch]) 
  console.log(appInfo);
  //console.log(appInfo.user.name);

  const handleClick = () =>{
    /*  dispatch(putEditAppointment({medicalRecord:log},idApp)) */
    console.log('entre')
     dispatch(showModal(true))
  } ;
  const handleHistoriaClinica = () =>{
    !hClinica?setHClinica(true):setHClinica(false)
    /* dispatch(putEditAppointment({medicalRecord:log},idApp)) */ 
  } ;
console.log(appInfo.userEmail)
  return (
    
    <div className="App">
       
      <div className='editor'>
      <div>
            <h2>Paciente:{appInfo?.user?.name}</h2>
            <h2>Edad: {getAge(appInfo?.user?.dateOfBirth)}</h2>
            <h3>Dia: {appInfo.date?appInfo?.date[2]+'/'+appInfo?.date[1]+'/'+appInfo?.date[0]:null}</h3>
            <button onClick={handleHistoriaClinica}>{!hClinica?'ver Historia Clinica':'Dejar de ver Historia Clinica'}</button>
            {hClinica?<div style={{ height: 350, width: '100%' }}><MedicalRecordUser userEmail={appInfo?.userEmail}/></div>:null}
        </div>
        <CKEditor
          editor={ClassicEditor}
          data ={log}
          onChange={(event, editor)=>{
            const data=editor.getData()
            setLog(data )
          }}
          />
      </div>
    <div>
      <h2>Version final para Historia Clinica</h2>
        <p>{parse(log)}</p>
      <button onClick={handleClick}>guardar</button>
      {show?<ModalConfirma medicalRecord={log} idApp={idApp} />:null}
    </div>

    </div>
        );
}

export default MedicalRecordLog;

