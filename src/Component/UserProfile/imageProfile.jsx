import React from "react";
import './imageProfile.css'


const ImageUser = ({image}) => {
    return ( 
        <div className="profileImageContainer">
            <img src={image} alt="UserImage" className="image"/>
        </div>
     );
}
 

export default ImageUser;