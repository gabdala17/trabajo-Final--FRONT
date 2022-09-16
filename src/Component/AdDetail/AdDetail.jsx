import React, { useState } from "react";
import { useEffect } from "react";
// import { Navbar } from 'react-bootstrap'
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { clearAdDetails, getAdById, getUsersById } from "../../Redux-actions";
import AppCalendario from "../AppCalendario/AppCalendario";
import Navbar from "../Navbar/Navbar";
import "./AdDetail.css";

export default function AdDetail({ isProfesional }) {
  const dispatch = useDispatch();
  const { adID } = useParams();
  //const User = useSelector((state) => state.userDetail);
  let adDetail = useSelector((state) => state.adDetail);

  //console.log(adID)

  useEffect(() => {
    
    dispatch(getAdById(adID));
    return () => {
      dispatch(clearAdDetails());
    };
  }, [dispatch]);

  // useEffect(() => {
  //     dispatch(getUsersById(adDetail.professional?.userEmail));
  //   }, [dispatch]);

  const [buttonLi, setbuttonLi] = useState(false);

  return (
    <>
      
      <div className="AdDetailContainer">
        <div className="DetailName">{adDetail.professional?.user?.name}</div>
        <div className="licenseDetail">
          {" "}
          Licencia Medica : {adDetail.professional?.medicalLicense}
        </div>
        {/* <div className="numeroDetail">
          Numero de identidad:{adDetail.professional?.user?.identification}
        </div> */}

        <div className="specialityDetail">
          {adDetail?.specialty} $: {adDetail?.price}
        </div>
        <div className="serviceDetail">
          {" "}
          Tipo de servicio:{adDetail?.serviceType}
        </div>
        {/* <button
          className="medicalPictureButton"
          onClick={() => setbuttonLi(!buttonLi)}
        >
          Ver Imagen de Licencia
        </button>
        {buttonLi && (
          <div className="imagenLicencia">
            <img src={adDetail.professional?.licenceImage} />
          </div>
        )} */}
      </div>

      <div className="calendarContainer">
        {!adDetail.professional?.medicalLicense ? (
          <p>Loading ..</p>
        ) : (
          <AppCalendario
            name={adDetail.professional?.user?.name}
            isProfesional={isProfesional}
            ad={adDetail}
            professionalMedicalLicense={adDetail.professional?.medicalLicense}
            professionalEmail = {adDetail.professional?.user?.email}
          />
          )}
          </div>
    </>
  );
}
