"use client";

import React, { useState } from "react";
import PaymentIcon from "@mui/icons-material/Payment";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useRouter } from "next/navigation";

export default function Wallet() {
  const [amount, setAmount] = useState<number | null>();
  const [error, setError] = useState(false);
  const router = useRouter();

  function handleClick() {
    if (!amount || amount < 10) {
      setError(true);
      return;
    }
    setError(false);
    router.push(`/profile/wallet/payment/?amount=${amount}`);
  }

  return (
    <div className="p-5 shadow-sm shadow-gray-400 rounded-md">
      <div>
        <div className="flex justify-between">
          <div>
            <p className="text-gray-600">Wallet Amount</p>
            <h1 className="text-3xl my-3 font-semibold">$ 123.00</h1>
          </div>
          <div>
            <div className="bg-gray-300 p-2 rounded-full">
              <PaymentIcon color="primary" sx={{ fontSize: 50 }} />
            </div>
          </div>
        </div>
        <input
          type="number"
          className="outline-none text-gray-600 w-full border px-3 py-2"
          placeholder="$ enter the amount"
          onChange={(e) => setAmount(Number(e.target.value))}
          min={10}
        />
        {error && <p className="text-red-500">Enter a minimum of $10</p>}
        <button
          className="bg-[#231656] text-white font-semibold px-3 py-2 rounded-full mt-4"
          onClick={handleClick}
        >
          Add Amount <ArrowForwardIcon />
        </button>
      </div>
    </div>
  );
}
