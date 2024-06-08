"use client";

import React from "react";
import PaymentIcon from "@mui/icons-material/Payment";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import PaymentModal from "@/components/PaymentModal";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePrmoise = loadStripe(`${process.env.STRIPE_PUBLISHABLE_KEY as string}` );

export default function Wallet() {

  
  return (
    <div className="p-5 shadow-sm shadow-gray-400 rounded-md">
      <div className="">
        <div className="flex justify-between">
          <div className="">
            <p className="text-gray-600">Wallet Amount</p>
            <h1 className="text-3xl my-3 font-semibold">$ 123.00</h1>
          </div>
          <div>
            <div className="bg-gray-300 p-2 rounded-full">
              <PaymentIcon color="primary" sx={{ fontSize: 50 }} />
            </div>
          </div>
        </div>
        <Elements stripe={stripePrmoise}>
          <PaymentModal />
        </Elements>
        {/* <button className="bg-blue-700 text-white font-semibold px-3 py-2 rounded-full mt-4">
          Add Amount <ArrowForwardIcon />
        </button> */}
      </div>
    </div>
  );
}
