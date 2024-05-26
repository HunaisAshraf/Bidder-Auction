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
import { useForm } from "react-hook-form";

type FormValues = {
  name: string;
  email: string;
  phone: number;
  password: string;
  confirmPassword: string;
};

export default function Signup() {

  const { register, handleSubmit, formState, getValues } =
    useForm<FormValues>();
  const { errors } = formState;

  const router = useRouter();

  const handleSignup = async(data: FormValues) => {
    try {
      console.log(data);

      // e.preventDefault();
      // const user = {
      //   name,
      //   email,
      //   phone,
      //   password,
      // };

      // const { data } = await axiosInstance.post("/api/auth/signup", user);

      // console.log(data);

      // if (data.success) {
      //   router.push("/");
      // }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mx-96 shadow-lg flex justify-center min-h-[91vh]">
      <form className="w-100" onSubmit={handleSubmit(handleSignup)} noValidate>
        <h1 className="text-3xl font-semibold text-gray-500 my-10">SignUp</h1>
        <Input
          type="text"
          placeholder="Name"
          icon={<DriveFileRenameOutlineRoundedIcon />}
          {...register("name", {
            required: "Please enter name",
            pattern: {
              value: /^[A-Za-z]+$/i,
              message:
                "Please valid characters only. [Alphabets A to Z, a to z ]",
            },
          })}
          errors={errors.name?.message}
        />
        <Input
          type="email"
          placeholder="Email"
          icon={<AlternateEmailRoundedIcon />}
          {...register("email", {
            required: "Please enter email",
            pattern: {
              value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
              message: "Please enter valid email",
            },
          })}
          errors={errors.email?.message}
        />
        <Input
          type="number"
          placeholder="Phone"
          icon={<LocalPhoneRoundedIcon />}
          {...register("phone", {
            required: "Please enter phone number",
            minLength: {
              value: 10,
              message: "Please enter valid phone number",
            },
            maxLength: {
              value: 10,
              message: "Please enter valid phone number",
            },
          })}
          errors={errors.phone?.message}
        />
        <Input
          type="password"
          placeholder="Password"
          icon={<PasswordRoundedIcon />}
          {...register("password", {
            required: "Please enter password",
            pattern: {
              value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/,
              message:
                "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character",
            },
          })}
          errors={errors.password?.message}
        />
        <Input
          type="password"
          placeholder="Confirm Password"
          icon={<PasswordRoundedIcon />}
          {...register("confirmPassword", {
            validate: (value) => {
              const password = getValues("password");
              return password === value || "Password dosen't match";
            },
          })}
          errors={errors.confirmPassword?.message}
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
