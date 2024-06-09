"use client";

import PaymentForm from "@/components/PaymentForm";
import { axiosInstance } from "@/utils/constants";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

export default function Payment() {
  const [clientSecret, setClientSecret] = useState<string>("");

  const searchParams = useSearchParams();

  const amount = searchParams.get("amount");

  async function getClientSecret() {
    try {
      const { data } = await axiosInstance.post(
        "/api/payments/create-payment-intent",
        { amount }
      );
      if (data.clientSecret) {
        setClientSecret(data.clientSecret);
      }
    } catch (error) {
      console.error(error);
    }
  }

  //   const appearance = {
  //     theme: "stripe",
  //   };
  const options = {
    clientSecret,
  };

  useEffect(() => {
    getClientSecret();
  }, [amount]);
  return (
    <div>
      {clientSecret && (
        <Elements stripe={stripePromise} options={options}>
          {/* <PaymentModal /> */}
          <PaymentForm />
        </Elements>
      )}
    </div>
  );
}
