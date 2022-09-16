import React from "react";
import "./circuito.css";
import { Link } from "react-router-dom";

function circuito() {




  return (
    <>
      <div className="Iam">
        <div className="infoCircuito">
          <span className="titleAyDOc">Medicine App</span>
        </div>
        <div className="CItasCOntainer">
          <p>Citas</p>
          <b>
            <div className="innerIam">
              Virtuales
              <br />
              Presenciales
              <br />
              A Domicilio
              <br />
            </div>
          </b>
        </div>
        <div className="titleAyDOc">
          <span>Escoge como atenderte</span>
        </div>

        {/* buttons  */}
        <Link
          to="/services"
          style={{ textDecoration: "inherit", color: "inherit" }}
        >
          <button className="btn highlighted-btn buttonLinks">Ver mas</button> <br />
        </Link>
          <div className="eresProfesional">
            <span >¿Eres profesional de salud?</span>

          </div>
        <Link
          to="/home/validate"
          style={{ textDecoration: "inherit", color: "inherit" }}
        >
          <button className="btn highlighted-btn buttonLinks">Unete al equipo</button>
        </Link>
      </div>
    </>
  );
}

export default circuito;
