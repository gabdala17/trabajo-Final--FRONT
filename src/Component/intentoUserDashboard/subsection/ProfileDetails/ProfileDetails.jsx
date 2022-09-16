import React from "react";
// import MedicalRecordUser from "./medicalRecordUser";
// import ImageUser from "./imageProfile";
// import Favorites from "./favoritesProfessionalUser";
// import InfoUser from "./InfoUserProfile";
// import HistoryAppointment from "./historyAppointmentUser";
// import ModalUnsubscribe from "../Unsubscribe/ModalUnsubscribe";
// import CreateAd from "../CreateAd";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { addFavorite, clearUserDetail, getUserApps, getUsersById } from '../../../../Redux-actions'
import { Link } from "react-router-dom";
// import "./StyleProfile.css";
// import Ad from "../Card/Ad";
import firebaseApp from "../../../../Credential/index";
import { getAuth} from "firebase/auth";
import Login from "../../../Login/Login";
import ModalCreateAdd from "../../../CreateAd/Modal";
import { useNavigate } from "react-router-dom";
import ImageUser from "../../../UserProfile/imageProfile.jsx";
import InfoUser from "../../../UserProfile/InfoUserProfile.jsx";
// import Appointments from "./Apointments";
// import Dashboard from "../Admin/Dashboard";
// import ProfessionalAppointments from "./ProfessionalAppointments";



const UserProfile = () => {
    const auth = getAuth(firebaseApp);
    const User = useSelector((state) => state.userDetail);
    const user = useSelector((state) => state.userValidated);
    console.log('user.email', user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [button, setButton] = useState(false);
  const [show, setShow]=useState(false)

  let favML = JSON.parse(localStorage.getItem("ml"));
  console.log('auth', auth)
  useEffect(() => {
    dispatch(getUsersById(user?.email?.toLowerCase()));
    dispatch(getUserApps(user?.email))
    if (favML && user?.email) {
      dispatch(addFavorite(favorites));
    }
    return() =>{
      dispatch(clearUserDetail())
   }
  }, [dispatch]);

  function handleClick(){ 
    setShow(true)
    }
  let favorites = {
    userEmail: user?.email,
    medicalLicense: favML,
  };

  return (
    <div>
      {User.email && !User.active && navigate("/recover")}
      {User.email && User.deletedByAdmin && navigate("/deletedUser")}
  {
      User.email ? 
        <div>
          {/* <Navbar user={user} /> */}
          <div className="nuestracontainer">
            {/* Boton provisorio hasta que este la NAV BAR lleva a HOME */}

            <div className="primercont">
              <div className="micontainerImage">
                <ImageUser image={User.userimage} />
              </div>
              <div className="micontainerInfo ">
                <InfoUser
                  name={User.name}
                  email={User.email}
                  country={User.country}
                  province={User.province}
                  city={User.city}
                  birthdate={User.dateOfBirth}
                />
              </div>
            </div>
          </div>         
    </div>
      : null}
  </div>
  );
};

export default UserProfile;
