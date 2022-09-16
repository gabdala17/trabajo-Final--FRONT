import React from "react";
import fondo from "../../assets/fondo.png";
import "./Image.css";

function Image() {
  return (
    <div className="ImageTopFooter">
      <img src={fondo} alt="No hay conexión a internet " />
    </div>
  );
}

export default Image;
