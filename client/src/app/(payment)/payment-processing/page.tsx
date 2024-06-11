"use client";

import { axiosInstance } from "@/utils/constants";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function PaymentProcessing({
  searchParams,
}: {
  searchParams: {
    payment_intent: string;
  };
}) {
  const router = useRouter();

  const addPayment = async () => {
    try {
      const { data } = await axiosInstance.post("/api/payments/add-to-wallet", {
        paymentIntent: searchParams.payment_intent,
      });

      if (data.success) {
        router.replace(`/payment-success?data=${JSON.stringify(data)}`);
      } else {
        router.replace(`/payment-failure`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    addPayment();
  }, []);

  return (
    <div className="h-screen flex justify-center items-center">
      <p>PaymentProcessing</p>
    </div>
  );
}
