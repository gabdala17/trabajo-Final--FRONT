import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {app} from '../../Credential/firebase'
import { getUsersById } from "../../Redux-actions";
import Loader from "../Loader/Loader";
import LoginClear from "../Login/LoginClear";
import UserProfile from "../UserProfile/UserProfile";

const SingIn=()=>{
    //const User = useSelector((state) => state.userDetail);
    const [user, setUsuario] = useState(null);
    const [isLoading, setIsLoading] = useState(true)

   
    let User = localStorage.getItem('Email');
    
    // useEffect(()=>{
        
    //     // setIsLoading(true)

    //     app.auth().onAuthStateChanged((usuarioFirebase) => {
    //         console.log("ya tienes sesión iniciada con:", usuarioFirebase);
    //         usuarioFirebase !== null && localStorage.setItem("Email", usuarioFirebase?.email);
    //         setUsuario(usuarioFirebase);
    //         usuarioFirebase !==null &&
    //         dispatch(getUsersById(usuarioFirebase?.email.toLowerCase()))
    //     })
    
    //     setIsLoading(false)
        
    // },[])
    
    // console.log('isLoading', isLoading)
    return(
        <div>
        {isLoading?<p>Loading....</p>:null}
        {  
            User? <UserProfile setState={setIsLoading}/> : <LoginClear setState={setIsLoading}/>
        }
    </div>
    )

}
export default SingIn