import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { putEditAppointment, selectedTime } from "../../Redux-actions";
// import './Payment.css'

const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "blue",
      color: "black",
      fontWeight: 500,
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": { color: "#fce883" },
      "::placeholder": { color: "#87bbfd" },
    },
    invalid: {
      iconColor: "#ffc7ee",
      color: "#ffc7ee",
    },
  },
};

export default function PaymentForm({ adId, name, ad,info}) {
  
// useEffect(()=>{
//   // return()=>{
//   //   window.location.reload()
//   // }
// })


let idApp=info
  const [success, setSuccess] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const dispatch=useDispatch()
  const navigate= useNavigate()
  //localStorage.setItem("Email", post.email)
 //userEmail
 const userEmail=localStorage.getItem("Email")
 
  //modal Elements
  const handleClose = () =>{
    setShow(false)
    dispatch(putEditAppointment({status:'available', userEmail: userEmail},idApp))
    dispatch(selectedTime(false))
  } ;
  const handleShow = () => setShow(true);
  const [show, setShow] = useState(false);

  let price= Number(ad.price)*100

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error) {
      try {
        const { id } = paymentMethod;
        const response = await axios.post("http://localhost:3001/payment", {
          amount: price ,
          id,
          currency: "ars",
			    description: `Turno con ${name}`,
        });

        if (response.data.success) {
          setSuccess(true);
          dispatch(putEditAppointment({status:'pending', userEmail: userEmail},idApp))
          dispatch(selectedTime(false))

         
         /*  navigate('/home/validate') */

          navigate( '/pago/'+ idApp)

        }
      } catch (error) {
        console.log("Error", error);
      }
    } else {
      console.log(error.message);
    }
  };

  return (
    <>
      <Button variant="danger" size="sm" onClick={handleShow}>
        Pagar
      </Button>
      <Modal centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Método de Pago</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {!success ? (
            <form onSubmit={handleSubmit}>
              <CardElement options={CARD_OPTIONS} />
              
            </form>
          ) : (
            <div>
              <h2>Su pago ha sido procesado exitosamente</h2>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
        
          <Button variant="secondary" size="sm" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="primary" size="sm" onClick={handleSubmit}>
           Pagar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
