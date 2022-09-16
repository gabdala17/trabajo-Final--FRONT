import React from "react";
import Otto from "../../assets/otto.jpg";
import Esme from "../../assets/esme.jpg";
import Bauti from "../../assets/bauiti.jpg";
import Agus from "../../assets/Agus.jpg";
import Gise from "../../assets/chise.jpg";
import Charlie from "../../assets/Charlie.jpg";
import Ivan from "../../assets/ivan.jpg";
import Card from "react-bootstrap/Card";

import { GoMarkGithub } from "react-icons/go";
import { BsLinkedin } from "react-icons/bs";
import './About.css'

export default function About() {
  let group = [
    {
      name: "Otoniel Reyes",
      image: Otto,
      linkedIn: "https://www.linkedin.com/in/otoniel-reyes-blanco-fullstack/",
      gitHub:"https://github.com/Otorb"
    },
    {
      name: "Esmeralda Nield",
      image: Esme,
      linkedIn: "https://www.linkedin.com/in/esmeralda-nield-fullstack/",
      gitHub:"https://github.com/ESMENIELD"
    },
    {
      name: "Bautista Mendez Casariego",
      image: Bauti,
      linkedIn: "https://www.linkedin.com/in/bautista-mendez-casariego-708239246/",
      gitHub:"https://github.com/BautistaMendezC"
    },
    {
      name: "Agustin Juan Rubí",
      image: Agus,
      linkedIn: "https://www.linkedin.com/in/agusjr/",
      gitHub:"https://github.com/agusjuanrubi"
    },
    {
      name: "Gisella Abdala",
      image: Gise,
      linkedIn: "https://www.linkedin.com/in/gisella-abdala/",
      gitHub:"https://github.com/gabdala17"
    },
    {
      name: "Ivan Velazquez",
      image: Ivan,
      linkedIn: "https://www.linkedin.com/in/ivan-vel/",
      gitHub:"https://github.com/IvanVelazquezz98"
    },
    {
      name: "Carlos Vazquez Nocetto",
      image: Charlie,
      linkedIn: "https://www.linkedin.com/in/carlosvazqueznosetto/",
      gitHub:"https://github.com/neleon10"
    },
  ];
  return (
    <div className="aboutMedicine">
      <div className="aboutTitle">
        <h1 className="titleAbout">Nosotros</h1>
      </div>
      <div className="aboutText">
        <h2>
          Somos graduados del Bootcamp soy Henry!
          
        </h2>
        <h2>realizamos este proyecto para
          la etapa final.</h2>
      </div>
      <div className="aboutCards">
        {group.map((el) => {
          return (
            <>
            <Card border="dark" style={{ width: '18rem', margin:'2%' }}>
              <Card.Img variant="top" src={el.image} />
              <Card.Body>
                <Card.Title>{el.name}</Card.Title>
              </Card.Body>
              <Card.Footer>
                <Card.Link href={el.gitHub}>
                  <GoMarkGithub color="black" />
                </Card.Link>
                <Card.Link href={el.linkedIn}>
                  <BsLinkedin />
                </Card.Link>
              </Card.Footer>
            </Card>
            </>
          );
        })}
        </div>
         <div className="aboutText">
        <h2>
          Esperamos sus comentarios para seguir mejorando
          nuestro proyecto.
        </h2>
      </div>
     
    </div>
  );
}
