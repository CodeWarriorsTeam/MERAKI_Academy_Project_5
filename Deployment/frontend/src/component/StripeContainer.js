import React, { useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import PaymentForm from "./PaymentForm";

const PUBLIC_KEY =
  "pk_test_51KRxhZHwP3M1d1OYIHjkAUH2He8f4Kbqzs1Or74zKiLIAEo1x8QyolM5Bh2XMxdvHO6OZWNlkcRy3FCYdjl5DB8Y00UXyPp0Dy";

const stripeTestPromise = loadStripe(PUBLIC_KEY);

export default function StripeContainer() {
  //  const [PUBLIC_KEY,setPUBLIC_KEY]=useState("pk_test_51KRxhZHwP3M1d1OYIHjkAUH2He8f4Kbqzs1Or74zKiLIAEo1x8QyolM5Bh2XMxdvHO6OZWNlkcRy3FCYdjl5DB8Y00UXyPp0Dy")
  // console.log(PUBLIC_KEY);

  // console.log(666666666);
  //  const [stripeTestPromise,setStripeTestPromise]=useState(loadStripe(PUBLIC_KEY))
  return (
    <Elements stripe={stripeTestPromise}>
      <PaymentForm />
    </Elements>
  );
}