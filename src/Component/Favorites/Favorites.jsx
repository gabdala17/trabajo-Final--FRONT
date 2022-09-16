import { useSelect } from "@mui/base";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAdsFavorites } from "../../Redux-actions";
import Ad from "../Card/Ad";

function Favorites(favorites) {

  //console.log('esto es lo que llega a favoritos',favorites);
  const allFavorites = useSelector((state) => state.favoritesAds);
  const dispatch = useDispatch();
  useEffect(() => {
    
    dispatch(getAdsFavorites(favorites));
  },[]);
  const adsFavorites= allFavorites.flat()
  //console.log("soy estado global en favoritos",adsFavorites);

return (
  <>
  
  {adsFavorites?.map((ad) => {
    return( <Ad
      key={ad.id}
      adID={ad.id}
      name={ad.professional?.user.name}
      medicalLicense={ad.professionalMedicalLicense}
      especialidad={ad.specialty}
      serviceType={ad.serviceType}
      precio={ad.price}
      ranking={ad.professional?.ranking}
      userimage={ad.professional?.user.userimage}
      email={ad.professional?.user?.email}
      />)
    })
  }
        
  </>
      )
    
  
}

export default Favorites;
