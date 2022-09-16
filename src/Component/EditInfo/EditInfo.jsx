import React from 'react'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsersById, putEditInfoProfessional, putEditInfoUser } from '../../Redux-actions'
import { useParams, useNavigate } from 'react-router-dom'
import Footer from "../Footer/Footer.jsx"
import Navbar from '../Navbar/Navbar'
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import './EditInfo.css'
import { getAuth, updatePassword } from "firebase/auth";
import Alert from 'react-bootstrap/Alert';
import { uploadFile } from "../../Credential/index";
import ModalConfirm from './ModalConfirm';

export default function EditInfo() {


  const auth = getAuth();
  const user = auth.currentUser;
  const navigate = useNavigate();
  let { userId } = useParams();
  let dispatch = useDispatch();
  let User = useSelector(state => state.userDetail)

  const [file, setFile] = useState(null);
  const [fileId, setFileId] = useState(null)
  const [filelicence, setFilelicence] = useState(null)

  const [image, setImage] = useState(null)
  const [imageId, setImageId] = useState(null)
  const [prolicenceImage, setProLicenceImage] = useState(null)
  const [confirmInfo , setConfirmInfo] = useState(null)

  const handlefile = async (e) => {
    e.preventDefault();
    try {
      let url = await uploadFile(file);
      setImage(url);
    } catch (err) {
      console.log(err);
    }

  };
  const handleImageId = async (e) => {
    e.preventDefault();
    try {
      let url = await uploadFile(fileId);
      setImageId(url);
    } catch (err) {
      console.log(err);
    }

  };
  const handleLicenceImage = async (e) => {
    e.preventDefault();
    try {
      let url = await uploadFile(filelicence);
      setProLicenceImage(url);
    } catch (err) {
      console.log(err);
    }

  };

  useEffect(() => {
    dispatch(getUsersById(userId));
  }, [dispatch])

  let [alert, setAlert] = useState(false)
  let [alert2, setAlert2] = useState(false)

  let [password, setPassword] = useState({
    password: "",
    password2: "",
  })
  console.log('image' , image)
  console.log('idimagen', imageId)

  let [editUser, setEditUser] = useState({
    name: User.name,
    password: User.password,
    password2: User.password,
    dateOfBirth: User.dateOfBirth,
    identification: User.identification,
    userimage: image ? image : User.userimage ,
    idImage: imageId ? imageId : User.idImage,
    country: User.country,
    city: User.city,
    address: User.address,
    province: User.province,
    phone: User.phone,
    rol: User.rol,
    gps: User.gps,
  })
  console.log('edit user' , editUser)

  let [editProfessional, setEditProfessional] = useState({
    aboutMe: User.professional?.aboutMe,
    college: User.professional?.college
  })



  function handleDisingageProfessional(e) {
    e.preventDefault();
    setEditUser({
      ...editProfessional,
      rol: "usuario",
    })
  }

  function handleRegisterProfessional(e) {
    e.preventDefault();
    setEditUser({
      ...editUser,
      rol: "professional",
    })
  }

  function handleChangeUser(e) {
    e.preventDefault();
    setEditUser({
      ...editUser,
      [e.target.name]: e.target.value
    })
  }

  function handleChangePass1(e) {
    if (password.password < 7) { setAlert(1) }
    e.preventDefault();
    setPassword({
      ...password,
      [e.target.name]: e.target.value
    })
    if (password.password.length < 7) { setAlert(true) }
    if (password.password.length >= 7) { setAlert(false) }
  }

  function handleChangePass2(e) {
    e.preventDefault();
    setPassword({
      ...password,
      [e.target.name]: e.target.value
    })
    if (password.password !== password.password2) { setAlert2(true) }
    if (password.password === password.password2) { setAlert2(false) }
  }

  function handleChangeProfessional(e) {
    e.preventDefault();
    setEditProfessional({
      ...editProfessional,
      [e.target.name]: e.target.value
    })
  }


  function handleSubmit(e) {
    e.preventDefault();

    if (password.password.length < 7) { setAlert(true) }
    if (password.password !== password.password2) { setAlert2(true) }
    if (password.password === password.password2 && password.password.length > 6) {


      updatePassword(user, password.password)
    }
    let user= {
      name: editUser.name,
      password: editUser.password,
      password2: editUser.password,
      dateOfBirth: editUser.dateOfBirth,
      identification: editUser.identification,
      userimage: image ? image : editUser.userimage ,
      idImage: imageId ? imageId : editUser.idImage,
      country: editUser.country,
      city: editUser.city,
      address: editUser.address,
      province: editUser.province,
      phone: editUser.phone,
      rol: editUser.rol,
      gps: editUser.gps,
    }

    
    
    console.log('userhandle' , user)
    if(User.rol === 'professional' ){
    dispatch(putEditInfoUser(user, userId))
    dispatch(putEditInfoProfessional(editProfessional, User.professional.medicalLicense))
    }
    else{dispatch(putEditInfoUser(user, userId))}
    

    setEditUser({
      name: "",
      password: "",
      dateOfBirth: "",
      identification: "",
      userimage: "",
      idImage: "",
      country: "",
      city: "",
      address: "",
      province: "",
      phone: "",
      rol: "",
      gps: "",
    })
    setEditUser({
      aboutMe: "",
      college: "",
    })
    setPassword({
      password: "",
      password2: "",
    })
    setAlert(0);
    setConfirmInfo(true)
    
  }


  return (
    <div>
    {confirmInfo ? <ModalConfirm /> : null}
   
    <div>
      
      <Form onSubmit={e => handleSubmit(e)}>
        <div>

          <Form.Group className="mb-3" >
            <Form.Label>Nombre: </Form.Label>
            <Form.Control
              type="text"
              id="name"
              name="name"
              value={editUser.name}
              placeholder={User.name}
              onChange={(e) => handleChangeUser(e)}
            />
          </Form.Group>

        </div>
        <div>

          <Form.Group className="mb-3" >
            <Form.Label>Contraseña: </Form.Label>
            <Form.Control
              type="password"
              id="password"
              name="password"
              value={password.password}
              placeholder={password.password}
              onChange={(e) => handleChangePass1(e)}
            />
          </Form.Group>
          {(alert && password.password.length < 7) && (<Alert variant='warning' className="error" >la contraseña debe tener al menos 7 caracteres</Alert>)}
        </div>

        <div>

          <Form.Group className="mb-3" >
            <Form.Label> Confirmar contraseña: </Form.Label>
            <Form.Control
              type="password"
              id="password2"
              name="password2"
              value={password.password2}
              placeholder={password.password2}
              onChange={(e) => handleChangePass2(e)}
            />
          </Form.Group>
          {(alert2 && password.password !== password.password2) && (<Alert variant='warning' className="error" >las contraseñas no coinciden</Alert>)}
        </div>

        <div>

          <Form.Group className="mb-3" >
            <Form.Label> Fecha de Nacimiento: </Form.Label>
            <Form.Control
              type="text"
              id="dateOfBirth"
              name="dateOfBirth"
              value={editUser.dateOfBirth}
              placeholder={User.dateOfBirth}
              onChange={(e) => handleChangeUser(e)}
            />
          </Form.Group>

        </div>
        <div>

        <Form.Group className="mb-3">
                <Form.Label>Imagen de Usuario: </Form.Label>
                <Form.Control
                  type="file"
                  name="userimage"
                  onChange={(e) => setFile(e.target.files[0])}
                />
                <button onClick={(e) => handlefile(e)}>Subir Imagen</button>
              </Form.Group>

        </div>
      <div>
        <Form.Group className="mb-3">
                <Form.Label>ID Imagen: </Form.Label>
                <Form.Control
                  type="file"
                  name="idImage"
                  onChange={(e) => setFileId(e.target.files[0])}
                />
                <button onClick={(e) => handleImageId(e)}>Subir Imagen</button>
                {!imageId && (<Alert variant='warning' className="error"  >la foto dni es necesaria</Alert>)}
                {/* {imageId && (<FcCheckmark />)} */}
              </Form.Group>
        </div>
        <div>

          <Form.Group className="mb-3" >
            <Form.Label>DNI: </Form.Label>
            <Form.Control
              type="text"
              id="identification"
              name="identification"
              value={editUser.identification}
              placeholder={User.identification}
              onChange={(e) => handleChangeUser(e)}
            />
          </Form.Group>

        </div>
      
        <div>

          <Form.Group className="mb-3" >
            <Form.Label>Pais: </Form.Label>
            <Form.Control
              type="text"
              id="country"
              name="country"
              value={editUser.country}
              placeholder={User.country}
              onChange={(e) => handleChangeUser(e)}
            />
          </Form.Group>

        </div>
        <div>

          <Form.Group className="mb-3" >
            <Form.Label>Ciudad: </Form.Label>
            <Form.Control
              type="text"
              id="city"
              name="city"
              value={editUser.city}
              placeholder={User.city}
              onChange={(e) => handleChangeUser(e)}
            />
          </Form.Group>

        </div>
        <div>

          <Form.Group className="mb-3" >
            <Form.Label>Direccion: </Form.Label>
            <Form.Control
              type="text"
              id="address"
              name="address"
              value={editUser.address}
              placeholder={User.address}
              onChange={(e) => handleChangeUser(e)}
            />
          </Form.Group>

        </div>
        <div>

          <Form.Group className="mb-3" >
            <Form.Label>Provincia: </Form.Label>
            <Form.Control
              type="text"
              id="province"
              name="province"
              value={editUser.province}
              placeholder={User.province}
              onChange={(e) => handleChangeUser(e)}
            />
          </Form.Group>

        </div>
        <div>

          <Form.Group className="mb-3" >
            <Form.Label>Telefono: </Form.Label>
            <Form.Control
              type="text"
              id="phone"
              name="phone"
              value={editUser.phone}
              placeholder={User.phone}
              onChange={(e) => handleChangeUser(e)}
            />
          </Form.Group>

        </div>
        <div>

          <Form.Group className="mb-3" >
            <Form.Label>Ubicacion GPS: </Form.Label>
            <Form.Control
              type="text"
              id="gps"
              name="gps"
              value={editUser.gps}
              placeholder={User.gps}
              onChange={(e) => handleChangeUser(e)}
            />
          </Form.Group>

        </div>
        {(User.rol === "professional") &&
          <div >
            <Button onClick={e => handleDisingageProfessional(e)}>Dejar de brindar mis servicios de Profesional</Button>
          </div>
        }

        {(User.rol === "usuario") &&
          <div>
            <Button onClick={e => handleRegisterProfessional(e)}>registrarme como profesional de la salud</Button>
          </div>
        }
        {(User.rol === "professional") &&


          <div>

            <Form.Group className="mb-3" >
              <Form.Label>Sobre Mi: </Form.Label>
              <Form.Control
                type="text"
                id="aboutMe"
                name="aboutMe"
                value={editProfessional?.aboutMe}
                placeholder={User.professional?.aboutMe ? User.professional?.aboutMe : "complete"}
                onChange={(e) => handleChangeProfessional(e)}
              />
            </Form.Group>

            <div>

              <Form.Group className="mb-3" >
                <Form.Label>Estudios: </Form.Label>
                <Form.Control
                  type="text"
                  id="college"
                  name="college"
                  value={editProfessional?.college}
                  placeholder={User.professional?.college ? User.professional.college : "complete"}
                  onChange={(e) => handleChangeProfessional(e)}
                />
              </Form.Group>

            </div>
          </div>

        }
        {(password.password2 || password.password) && (password.password !== password.password2 || password.password.length < 7) ?
          <Button  >
            Revisa los datos ingresados
          </Button> :
          <Button type="submit" >
            Modificar Datos
          </Button>

        }
      </Form>

      <div className='hola'></div>
      {/* <Footer/> */}
    </div>
    </div>
  )
}