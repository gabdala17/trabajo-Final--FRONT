import React from "react";
import doc from "../../assets/doc.webp";
import PaymentForm from "../Payment/PaymentForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const Public_key =
  "pk_test_51LVdCCCRRZtIMaInvriUmPwPaAIa7kdO8QSZQoycHf6sKziNdhxZNwrBdZ8LZSq0a7uKnopXPRFOGsmekwo7EEmA00yQmCRx28";

const stripeTestPromise = loadStripe(Public_key);

function ModalPayment({info,professionalMedicalLicense,adId,name,ad}) {
 
  
  return (
    <div>
    <h3>${ad.price}</h3> 
      <Elements stripe={stripeTestPromise}>
        <PaymentForm info={info} professionalMedicalLicense={professionalMedicalLicense}adId={adId}name={name}ad={ad}/>
      </Elements>
    </div>

   
  );
}

export default ModalPayment;
