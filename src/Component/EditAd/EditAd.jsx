import React from 'react';
import Footer from "../Footer/Footer.jsx"
import Navbar from '../Navbar/Navbar'
import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import { getAdById, getAllSpecialtys, putEditInfoAd } from '../../Redux-actions'
import Form from 'react-bootstrap/Form';
// import {typeServices} from '../CreateAd/ServiceType'


export default function EditAd() {

  const navigate = useNavigate();
  let { AdId } = useParams();
  let dispatch = useDispatch();
  let Ad = useSelector(state => state.adDetail)
  const specialty = useSelector((state) => state.specialtys)


  useEffect(() => {
    dispatch(getAdById(AdId));
    dispatch(getAllSpecialtys())
  }, [dispatch])

  const typeServices = [
    {name:'Virtual'},
    {name:'Presencial'},
    {name:'A Domicilio'}
]

  let [editAd, setEditAd] = useState({
    specialty: Ad.specialty,
    price: Ad.price,
    timeAvailability: Ad.timeAvailability,
    serviceType: Ad.serviceType,
  })

  function handleSelectSpecialty(e) {
    e.preventDefault();
    setEditAd({
      ...editAd,
      specialty: e.target.value
    });
  }
  function handleSelectServiceType(e) {
    e.preventDefault();
    setEditAd({
      ...editAd,
      serviceType: e.target.value
    });
  }
  console.log('edit ad', editAd)

  function handleChange(e) {
    e.preventDefault();
    setEditAd({
      ...editAd,
      [e.target.name]: e.target.value
    })
  }

  function handleSubmit(e) {
    e.preventDefault();

    let ad = {
    specialty: editAd.specialty,
    price: editAd.price,
    timeAvailability: editAd.timeAvailability,
    serviceType: editAd.serviceType,

    }
    console.log('ad final' , ad)
    dispatch(putEditInfoAd(ad, AdId));
    setEditAd({
      specialty: "",
      price: "",
      timeAvailability: "",
      serviceType: "",
    })
    let path = "/home/validate"
    navigate(path)
  }



  return (

    <div>
 

      <Form onSubmit={e => handleSubmit(e)}>
        <div>

          <Form.Group className="mb-3">
            <Form.Label>Especialidad: </Form.Label>
            <select onChange={(e) => handleSelectSpecialty(e)}>
            <option value={null} >...</option>
              {
                specialty?.map((s) => {
                  return (<option value={s.name} key={s.id}>{s.name}</option>)
                })

              }
            </select>
          </Form.Group>



        </div>
        <div>
        <Form.Group className="mb-3">
            <Form.Label>Precio: </Form.Label>
            <Form.Control
              type="number"
              id="price"
              name="price"
              step={10}
              min={0}
              max={100000}
              value={editAd.price}
              placeholder={Ad.price}
              onChange={(e) => handleChange(e)}
            />
          </Form.Group>

        </div>
        <div>

        <Form.Group className="mb-3">
            <Form.Label>Tipo de servicio: </Form.Label>
            <select onChange={(e) => handleSelectServiceType(e)}>
              <option value={null} >...</option>
              {typeServices && typeServices?.map((p) => {
                return (<option value={p.name} key={p.name}>{p.name}</option>)
              })
              }
            </select>
          </Form.Group>

        </div>

        <Button type='Submit'>Editar Anuncio</Button>
      </Form>


      <Footer />
    </div>

  );
}
