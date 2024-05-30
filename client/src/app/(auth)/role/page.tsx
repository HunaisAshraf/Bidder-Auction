"use client";

import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import WorkIcon from "@mui/icons-material/Work";
import { useRouter } from "next/navigation";

export default function Role() {
  const router = useRouter();
  
  return (
    <div className="min-h-[75vh] flex justify-center items-center">
      <div className="flex justify-center items-center min-h-[90vh] w-[500px] border bottom-2 shadow-md border-t-0 border-b-0">
        <div className="w-[400px]">
          <div className="py-2 mb-6">
            <h1 className="text-3xl my-4">Join Us!</h1>
            <p className="text-gray-500">
              To begin this journey, tell us what type of account you’d be
              opening.
            </p>
          </div>
          <div className="py-3">
            <button
              onClick={() => router.push("/complete-profile/?role=bidder")}
              className="border rounded-md border-blue-500 flex justify-center items-center gap-4 py-2 px-4 my-3"
            >
              <AccountCircleIcon className=" text-blue-600" />
              <div className="text-left">
                <span className="font-semibold">Bidder</span>
                <p className="text-sm mt-1 text-gray-500">
                  Winning starts with bidding. Join the excitement!
                </p>
              </div>
              <ArrowForwardIcon className=" text-blue-600" />
            </button>
            <button
              onClick={() => router.push("/complete-profile/?role=auctioner")}
              className="border rounded-md border-blue-500 flex justify-center items-center gap-4 py-2 px-4 my-3"
            >
              <WorkIcon className=" text-blue-600" />
              <div className="text-left">
                <span className="font-semibold">Auctioner</span>
                <p className="text-sm mt-1 text-gray-500">
                  Empower your auctions. Be the conductor of competitive
                  bidding.
                </p>
              </div>
              <ArrowForwardIcon className=" text-blue-600" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
