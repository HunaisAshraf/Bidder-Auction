"use client";

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
import Link from "next/link";
import { useState } from "react";
import Spinner from "@/components/Spinner";
import { User } from "../../../utils/types";
import useAuth from "@/utils/hooks/auth";
import { signIn } from "next-auth/react";

type FormValues = {
  name: string;
  email: string;
  phone: number;
  password: string;
  confirmPassword: string;
};

export default function Signup() {
  useAuth();

  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState, getValues } =
    useForm<FormValues>();
  const { errors } = formState;

  const router = useRouter();

  const handleSignup = async (formData: FormValues) => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.post("/api/auth/signup", formData);

      console.log(data);

      if (data?.success) {
        const user = {
          id: data?.user?._id,
          name: data?.user?.name,
          email: data?.user?.email,
          phone: data?.user?.phone,
        };
        localStorage.setItem("auth", JSON.stringify(user));

        setLoading(false);
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="lg:mx-96 lg:shadow-lg flex justify-center min-h-[91vh]">
      <div>
        <form
          className="w-[400px]"
          onSubmit={handleSubmit(handleSignup)}
          noValidate
        >
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
                  "Password must contain at least 8 characters, 1 upper & lowercase letter, 1 number, on 1 special character",
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
          {loading ? (
            <Spinner />
          ) : (
            <button className="bg-[#002A2C] w-full text-white font-semibold p-3 rounded-md">
              SignUp
            </button>
          )}
        </form>
        <h1 className="text-center text-blue-600 my-3">Forgot password?</h1>

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

        <Link href="/login">
          <p className="text-center my-4 text-blue-600">
            Already have an account
          </p>
        </Link>
      </div>
    </div>
  );
}
