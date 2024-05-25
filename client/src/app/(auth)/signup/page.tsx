"use client";

import { FormEvent, useState } from "react";
import Input from "@/components/Input";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import DriveFileRenameOutlineRoundedIcon from "@mui/icons-material/DriveFileRenameOutlineRounded";
import AlternateEmailRoundedIcon from "@mui/icons-material/AlternateEmailRounded";
import LocalPhoneRoundedIcon from "@mui/icons-material/LocalPhoneRounded";
import PasswordRoundedIcon from "@mui/icons-material/PasswordRounded";
import { axiosInstance } from "@/utils/constants";
import { useRouter } from "next/navigation";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");

  const router = useRouter();

  const handleSignup = async (e: FormEvent) => {
    try {
      e.preventDefault();
      const user = {
        name,
        email,
        phone,
        password,
      };

      const { data } = await axiosInstance.post(
        "http://localhost:5000/api/auth/signup",
        user
      );

      console.log(data);

      if (data.success) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mx-96 shadow-lg flex justify-center min-h-[91vh]">
      <form className="w-100" onSubmit={handleSignup}>
        <h1 className="text-3xl font-semibold text-gray-500 my-10">SignUp</h1>
        <Input
          type="text"
          placeholder="Name"
          icon={<DriveFileRenameOutlineRoundedIcon />}
          setInput={setName}
        />
        <Input
          type="email"
          placeholder="Email"
          icon={<AlternateEmailRoundedIcon />}
          setInput={setEmail}
        />
        <Input
          type="number"
          placeholder="Phone"
          icon={<LocalPhoneRoundedIcon />}
          setInput={setPhone}
        />
        <Input
          type="password"
          placeholder="Password"
          icon={<PasswordRoundedIcon />}
          setInput={setPassword}
        />
        <Input
          type="password"
          placeholder="Confirm Password"
          icon={<PasswordRoundedIcon />}
          setInput={setconfirmPassword}
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
