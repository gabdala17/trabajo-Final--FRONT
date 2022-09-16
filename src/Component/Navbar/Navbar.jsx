import { Navbar, Nav, Container } from "react-bootstrap";
import React from "react";
import "./Navbar.css";
/* import "../Home/Text.css"; */
import { Link, useNavigate } from "react-router-dom";
import navlog from "../../assets/logo23.jpeg";
import perfil from "../../assets/perfil.png";
import firebaseApp from "../../Credential/index";
import { getAuth, signOut } from "firebase/auth";
import { useSelector } from "react-redux";

const NavBarExample = () => {
  const auth = getAuth(firebaseApp);
  const user = localStorage.getItem("Email");
  //console.log("auth", auth);
  const navigate = useNavigate();
  console.log('useNav', user);

  function closeSession() {
    signOut(auth);
    localStorage.removeItem("Email");
    let path = "/";
    navigate(path);
  }


  return (
    <>
      <Navbar className="navBg" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand className="nav2" as={Link} to="/">
            <img src={navlog} className="logoNAv" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/" className="spaceX">
                Home{" "}
              </Nav.Link>
              <Nav.Link as={Link} to="/services" className="spaceX">
                Servicios
              </Nav.Link>
              <Nav.Link as={Link} to="/about" className="spaceX">
                Nosotros
              </Nav.Link>

              {user? (
                <>
                  <Nav.Link as={Link} to="/home/profile" className="spaceX">
                    <img className="imagenPerfil" src={perfil} />
                  </Nav.Link>

                  <div className="closeSessionContainer">
                    <span>Hola, {user}</span>
                  </div>
                  <Nav.Link>
                    <div className="buttonNav" onClick={closeSession}>
                      Cerrar sesion
                    </div>
                  </Nav.Link>
                </>
              ) : (
                <Nav.Link as={Link} to="/home/singin" className="spaceX">
                  <p>iniciar sesión</p>
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
export default NavBarExample;
