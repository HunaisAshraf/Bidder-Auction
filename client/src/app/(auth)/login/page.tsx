"use client";

import Input from "@/components/Input";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import AlternateEmailRoundedIcon from "@mui/icons-material/AlternateEmailRounded";
import PasswordRoundedIcon from "@mui/icons-material/PasswordRounded";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="mx-96 shadow-lg flex justify-center  items-center min-h-[91vh]">
      <form className="w-100">
        <h1 className="text-3xl font-semibold text-gray-500 my-10">Login</h1>
        <Input
          type="email"
          placeholder="Email"
          icon={<AlternateEmailRoundedIcon />}
          value={email}
          setInput={setEmail}
        />
        <Input
          type="password"
          placeholder="Password"
          icon={<PasswordRoundedIcon />}
          value={password}
          setInput={setPassword}
        />
        <button className="bg-[#002A2C] w-full text-white font-semibold p-3 rounded-md">
          SignUp
        </button>
        <h1 className="text-center text-blue-600 my-3">Forgot password?</h1>

        <div className="flex justify-center items-center gap-3">
          <button className="flex items-center gap-2 border-2 rounded-md p-2">
            <GoogleIcon /> Google
          </button>
          <button className="flex items-center gap-2 border-2 rounded-md p-2">
            <FacebookRoundedIcon />
            Facebook
          </button>
        </div>
      </form>
    </div>
  );
}
