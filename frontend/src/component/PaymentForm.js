import React, { useState, useEffect } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import { useParams } from "react-router-dom";
const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "#c4f0ff",
      color: "#fff",
      fontWeight: 500,
      fontFamily: "Robato,Open Sans,Segoe UI,sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": { color: "#fce883" },
      "::placeholder": { color: "#87bbfb" },
    },
    invalid: {
      iconColor: "#ffc7ee",
      color: "#ffc7ee",
    },
  },
};

export default function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [success, setSuccess] = useState(false);
  const [amount, setAmount] = useState(0);
  const { id } = useParams();
  const [title, seTitle] = useState([]);
  const [isClosed, setIsClosed] = useState(true);

  const getbyid = async () => {
    try {
      const result = await axios.get(`http://localhost:5000/cases/${id}`);
      seTitle(result.data.result[0].title);
      console.log(result.data.result);
      console.log(88888);
      setIsClosed(result.data.result[0].TheAmountRequired);
      getbyid();
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    getbyid();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error) {
      try {
        const { id } = paymentMethod;
        const response = await axios.post(`http://localhost:5000/payment`, {
          amount,
          id,
          title,
        });
        if (response.data.success) {
          console.log("SuccessFull payment");
          setSuccess(true);
        }

        getbyid();
      } catch (error) {
        console.log("Error", error);
      }
    } else {
      console.log(error.message);
    }
  };
  return (
    <>
      {!success ? (
        <form onSubmit={handleSubmit}>
          <fieldset className="FormGroup">
            <div className="FormRow">
              <CardElement options={CARD_OPTIONS} />
            </div>
          </fieldset>
          <input
            className="IBAN"
            type="text"
            placeholder="how match"
            onChange={(e) => {
              setAmount(e.target.value);
            }}
          ></input>
          <button className={"Pay"} onClick={getbyid()}>
            Donate
          </button>
        </form>
      ) : (
        <div>
          <h2>the donation has been created successfully</h2>
        </div>
      )}
    </>
  );
}
