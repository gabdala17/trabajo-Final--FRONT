import React, { useEffect, useState } from "react";

import firebaseApp from "../../Credential/index";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import UserProfile from "../UserProfile/UserProfile";
import NavBar from "../Navbar/Navbar";
import { userValidated, getUsersById } from "../../Redux-actions";
import { useDispatch, useSelector } from "react-redux";
import Loader from '../Loader/Loader'
import Register from "../Login/Register";


const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

function Validate() {

  // const [user, setUser] = useState(null);
  const user= useSelector(state => state.userValidated)
  const User = useSelector((state) => state.userDetail)
  const [isLoading, setIsLoading] =useState(false)
  useEffect(()=>{
    if (user && !User.email) {
      setIsLoading(true)
      dispatch(getUsersById(user?.email?.toLowerCase())) 
      setIsLoading(false) 
    }
  },[user])


  const dispatch =useDispatch()

  async function getRol(uid) {
    const docuRef = doc(firestore, `user/${uid}`);
    const encryptedDoc = await getDoc(docuRef);
    //const finalInfo = encryptedDoc.data().rol;
    return encryptedDoc;
  }

  function setUserWithFirebaseAndRol(userFirebase) {
    getRol(userFirebase.uid).then((rol) => {
      const userData = {
        uid: userFirebase.uid,
        email: userFirebase.email,
        rol: rol,
      };
       dispatch(userValidated(userData));
    });
  }

  onAuthStateChanged(auth, (userFirebase) => {
     if (userFirebase) {
      if(!user)
      setUserWithFirebaseAndRol(userFirebase);
    } else {
      dispatch(userValidated(null))
    }
  });


  return (
    <div>
      {isLoading?<Loader/>:(user)?  
        ((User?.email)?<UserProfile/>:null)

      : 
       (      
          <div>
            <Register/>
          </div>
        
      )}
    </div>
  );
}

export default Validate;
