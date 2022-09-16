import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAds, removeFavorite, addFavorite } from "../../Redux-actions";
import Ad from "../Card/Ad";
import "./Ads.css";
import Paginated from './Paginated'
import Suppafilter from "../FilterAndOrder/Suppafilter";






export default function Ads() {
  const dispatch = useDispatch();

  let ads = useSelector((state) => state.ads);
  let user = useSelector((state) => state.userDetail);

  const [currentPage, setCurrentPage] = useState(1);//estado para la pagina actual  de el paginado, inicialmente es uno pero va cambiando en la funcion paginado
  const [adsPerPage] = useState(5);//estado que fija la cantidad de 
  const indexOfLastAd = currentPage * adsPerPage;
  const indexOfFirstAd = indexOfLastAd - adsPerPage;
  const currentAds = ads.slice(indexOfFirstAd, indexOfLastAd);
  

  const paginated = (pageNumber) => {
    setCurrentPage(pageNumber);//esta funcion recibe un numero del componente "Paginado" que surge de un recorrido for que agrega un numero agrega un numeros
    // con su valor incrementado en uno a un arreglo, comenzando desde el uno hasta llegar al numero que surge de dividir la cantidad de objetos que existen 
    //en mi estado de perros por la cantidad requerida en el estado de "dogPerPage", en este caso es 8.
  };
  const changePageNext=()=>{
      setCurrentPage((page)=> page + 1);
  }
  const changePagePrev=()=>{
      setCurrentPage((page)=> page - 1 );
  }
  

  useEffect(() => {
    dispatch(getAds());
  }, [dispatch]);

  let favoritesLocalstorage = [];

  function handleAddFavorites(e) {
    if (user.email) {
      let favorites = {
        userEmail: user.email,
        medicalLicense: [e.target.value],
      };
      e.preventDefault();
      dispatch(addFavorite(favorites));
    } else {
      favoritesLocalstorage.push(e.target.value);
      localStorage.setItem("ml", JSON.stringify(favoritesLocalstorage));
    }
  }

  function handleRemoveFavorites(e) {
    if (user.email) {
      let favorites = {
        userEmail: user.email,
        medicalLicense: [e.target.value],
      };
      e.preventDefault();
      dispatch(removeFavorite(favorites));
    } else {
      localStorage.removeItem("ml", e.target.value);
    }
  }

  return (
    <>
      <Suppafilter state={currentPage} setState={setCurrentPage} />
      <Paginated
      currentPage={currentPage}
       allAds={ads.length}
       adsPerPage={adsPerPage}
        changePagePrev={changePagePrev}
        changePageNext={changePageNext}
        paginated={paginated}
        />
     
      <div className="all">
        {currentAds
          ? currentAds.map((ad) => {
              if (
                ad.professional?.user?.rol === "professional" &&
                ad.professional.user.active &&
                !ad.professional.user.deletedByAdmin
              ) {
                return (
                  <>
                    <Ad
                      key={ad.id}
                      adID={ad.id}
                      name={ad.professional.user.name}
                      medicalLicense={ad.professionalMedicalLicense}
                      especialidad={ad.specialty}
                      serviceType={ad.serviceType}
                      precio={ad.price}
                      ranking={ad.professional.ranking}
                      userimage={ad.professional.user.userimage}
                      email={ad.professional.user.email}
                    />
                    {/* <button onClick={e=>handleAddFavorites(e)} value ={ad.professionalMedicalLicense}>agregar profesional a favoritos</button>
          <button onClick={e=>handleRemoveFavorites(e)} value={ad.professionalMedicalLicense}>remover profesionalde favoritos</button> */}
                  </>
                );
              }
            })
          : null}
      </div>
    </>
  );
}
