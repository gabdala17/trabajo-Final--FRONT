import React, {useEffect, useState}from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useSelector , useDispatch} from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "./Ad.css";
import { removeFavorite, addFavorite, getUsersById } from "../../Redux-actions";
import firebaseApp from "../../Credential/index";
import { getAuth } from "firebase/auth";
import {MdFavorite} from "react-icons/md";
import {MdFavoriteBorder} from "react-icons/md"
export default function Ad({
  name,
  medicalLicense,
  especialidad,
  serviceType,
  precio,
  ranking,
  adID,
  userimage,
  isProfesional
}) {
  const [favorito, setFavorito] =useState(false)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function handleNavigate() {
    navigate("/calendar");
  }

  const auth = getAuth(firebaseApp);
  const CurrentUser = useSelector((state)=>state.userDetail)

  useEffect(() => {
    dispatch(getUsersById(auth.currentUser?.email));
  }, [dispatch]);

  let favoritesLocalstorage = [];

  function handleAddFavorites(e) {
    if (auth.currentUser?.email) {
      let favorites = {
        userEmail: auth.currentUser?.email,
        medicalLicense: [medicalLicense],
      };
      e.preventDefault();
      dispatch(addFavorite(favorites));
      setFavorito(true)
    } else {
      favoritesLocalstorage.push(medicalLicense);
      localStorage.setItem("ml", JSON.stringify(favoritesLocalstorage));
      setFavorito(true)
    }
  }

  function handleRemoveFavorites(e) {
    if (auth.currentUser?.email) {
      let favorites = {
        userEmail: auth.currentUser?.email,
        medicalLicense: [medicalLicense],
      };
      e.preventDefault();
      dispatch(removeFavorite(favorites));
      setFavorito(false)
    } else {
      localStorage.removeItem("ml", medicalLicense);
      setFavorito(false)
    }
  }

  let nombre = name.split(' ');
  nombre = nombre.map(el=>(
     el.charAt(0).toUpperCase() + el.toLowerCase().slice(1)
     )).join(' ')


  return (
    <div className="cardDiv">
      
      {/* card image */}

      <div className="CardImage">
        <img src={userimage} alt="User Image" />
      </div>

      {/* Body */}
      <div className="CardBody">
        {/* card title */}
        <div className="CardTitle">
          <Link to={`/professional/` + medicalLicense}>
            <div>{nombre}-MN</div>
            <div>{medicalLicense}</div>
          </Link>
        </div>

        {/* speciality */}
        <div className="specialityDiv">{especialidad}</div>

        {/* services */}
        <div className="serviceDiv">{serviceType}</div>

        {/* fee */}
        <div className="fee">Precio:ARS ${precio}</div>

        {/* if he/she 's a professional */}
        <div className="ifPro">
          {isProfesional ? (
            <Link to={`/calendar/` + adID}>
              <Button variant="primary">Crea/Edita Turnos</Button>
            </Link>
          ) : (
            <Link to={`/home/` + adID}>
              <Button variant="primary">Turnos</Button>
            </Link>
          )}
          {(CurrentUser?.favorites?.includes(medicalLicense)) || (favorito) ?

           <MdFavorite  color="red" size="2em" onClick={e=>handleRemoveFavorites(e)}></MdFavorite> :
           <MdFavoriteBorder color="red" size="2em" onClick={e=>handleAddFavorites(e)}></MdFavoriteBorder >
          }



          {/* <Link to={`/home/` + adID}></Link> */}
        </div>
      </div>
    </div>
  );
}
