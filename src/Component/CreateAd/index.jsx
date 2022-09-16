import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postAdd } from "../../Redux-actions";
import { getUsersById, getAllSpecialtys} from "../../Redux-actions";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./CreateAd.css";
import ModalErrors from "../ModalsErrors/ErrorsRouta";
import EditAd from "../EditAd/EditAd";
// import { typeServices } from "./ServiceType";


export default function CreateAd({ user}) {
  const dispatch = useDispatch();
  const User = useSelector((state) => state.userDetail);
  const specialty =useSelector((state)=> state.specialtys)
 

  useEffect(() => {
    dispatch(getUsersById(user));
    console.log('user.email', user)
    dispatch(getAllSpecialtys())
  }, [dispatch]);

  const typeServices = [
    {name:'Virtual'},
    {name:'Presencial'},
    {name:'A Domicilio'}
]

  function handleChange(e) {
    e.preventDefault();
    setPost({
      ...post,
      [e.target.name]: e.target.value,
      professionalMedicalLicense: User.professional?.medicalLicense,
    });
  }
  function handleSelectSpecialty(e) {
    e.preventDefault();
    setPost({
      ...post,
      specialty: e.target.value
    });
  }

  function handleSelectServiceType(e) {
    e.preventDefault();
    setPost({
      ...post,
      serviceType: e.target.value
    });
  }


  const [post, setPost] = useState({
    specialty: "",
    price: "",
    timeAvailability: "",
    serviceType: "",
  });

  console.log('ad post', post)

  function handleSubmit(e) {
    //e.preventDefault();
    console.log('aca entre')
    try {

      let ad ={
        specialty: post.specialty,
        price: post.price,
        timeAvailability: "",
        serviceType: post.serviceType,
        professionalMedicalLicense: post.professionalMedicalLicense

      }
      console.log('ad final' , ad)
      dispatch(postAdd(ad));
      setPost({
        specialty: "",
        price: "",
        timeAvailability: "",
        serviceType: "",
        professionalMedicalLicense: "",
      });

    } catch (error) {
      <ModalErrors error={'No se pudo crear el Anuncio'} />
    }
  }


  return (
    <div>
      <div>
        <Form onSubmit={handleSubmit} className="formContainer mb-2">
          <Form.Group className="mb-3">
            <Form.Label>Especialidad: </Form.Label>
            <select onChange={(e) => handleSelectSpecialty(e)}>
            <option value='selected' hidden >especialidad</option>
              {
             specialty?.map((s) => {
                return (<option value={s.name} key={s.id}>{s.name}</option>)
              })
             
              }
            </select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Precio: ARS $:</Form.Label>
            <Form.Control
              type="number"
              id="price"
              name="price"
              step={10}
              min={0}
              max={100000}
              value={post.price}
              onChange={(e) => handleChange(e)}
            />
          </Form.Group>


          <Form.Group className="mb-3">
            <Form.Label>Tipo de servicio: </Form.Label>
            <select onChange={(e) => handleSelectServiceType(e)}>
            <option value='selected' hidden >servicio</option>
              {typeServices&& typeServices?.map((p) => {
                return (<option value={p.name} key={p.name}>{p.name}</option>)
              })
              }
            </select>
          </Form.Group>

          <div className="registerNforgottenButtons">


            <Button
              variant="info"
              size="sm"
              type="submit"
              onClick={() => handleSubmit()}
            >
              CREAR ANUNCIO
            </Button>

          </div>
        </Form>
      </div>
    </div>
  );
}