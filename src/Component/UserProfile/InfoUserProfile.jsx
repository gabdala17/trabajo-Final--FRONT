import React from "react";
import "./InfoUserProfile.css";

const InfoUser = ({ name, email, province, country, city, birthdate }) => {
  return (
    <div className="infoUserProfileContainer">

        <div className="nameProfile">{name}</div>
        <div className="fechaProfile">Fecha de nacimiento: {birthdate}</div>
        <div className="emailProfile">Email: {email} </div>
        <div className="paisProfile">Pais: {country}</div>
        <div className="provinciaProfile">Provincia: {province}</div>
        <div className="localidadProfile">Localidad: {city}</div>
      
    </div>
  );
};

export default InfoUser;
