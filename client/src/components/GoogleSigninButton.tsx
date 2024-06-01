"use client";

import { signIn } from "next-auth/react";
import React from "react";
import GoogleIcon from "@mui/icons-material/Google";

export default function GoogleSigninButton() {
  return (
    <div className="flex justify-center items-center gap-3">
      <button
        onClick={() => signIn("google")}
        className="flex items-center gap-2 border-2 rounded-md p-2"
      >
        <GoogleIcon /> Google
      </button>
      {/* <button className="flex items-center gap-2 border-2 rounded-md p-2">
   <FacebookRoundedIcon />
   Facebook
  </button> */}
    </div>
  );
}
