import React from "react";
import { Link } from "react-router-dom";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import Circuito from "./circuito";
import Image from './Image'
import './Home.css'
import {getAuth} from "firebase/auth";
import firebaseApp from "../../Credential/index";
import Comments from './Comments'

export default function Home() {

  const auth = getAuth(firebaseApp);
  console.log(auth.currentUser?.email)

  return (
    
    <div className="HomeMainContainer">
      
        <Link to = '/comments'><p>¿Qué opinan de Nosotros?</p></Link>
        <Circuito/>
        <Image />
      <Footer />
    </div>
  );
}
