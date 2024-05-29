"use client";

import Input from "@/components/Input";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import AlternateEmailRoundedIcon from "@mui/icons-material/AlternateEmailRounded";
import PasswordRoundedIcon from "@mui/icons-material/PasswordRounded";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useState } from "react";
import Spinner from "@/components/Spinner";
import { axiosInstance } from "@/utils/constants";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import useAuth from "@/utils/hooks/auth";
import { useAppDispatch } from "@/lib/store/hooks";
import { login } from "@/lib/store/features/userSlice";
import { signIn } from "next-auth/react";

type FormValue = {
  email: string;
  password: string;
};

export default function Login() {
  useAuth();

  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState } = useForm<FormValue>();
  const { errors } = formState;
  const router = useRouter();

  const dispatch = useAppDispatch();

  const handleLogin = async (formData: FormValue) => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.post("/api/auth/login", formData);

      console.log(data);

      if (data?.success) {
        const user = {
          id: data?.user?._id,
          name: data?.user?.name,
          email: data?.user?.email,
          phone: data?.user?.phone,
        };
        localStorage.setItem("auth", JSON.stringify(user));

        dispatch(login(user));

        router.push("/");
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error?.response?.data?.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-96 shadow-lg flex justify-center  items-center min-h-[91vh]">
      <Toaster />
      <div>
        <form className="w-100" onSubmit={handleSubmit(handleLogin)} noValidate>
          <h1 className="text-3xl font-semibold text-gray-500 my-10">Login</h1>
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
            type="password"
            placeholder="Password"
            icon={<PasswordRoundedIcon />}
            {...register("password", {
              required: "Please enter password",
            })}
            errors={errors.password?.message}
          />
          {loading ? (
            <Spinner />
          ) : (
            <button className="bg-[#002A2C] w-full text-white font-semibold p-3 rounded-md">
              Loing
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
        <Link href="/signup">
          <p className="text-center my-4 text-blue-600">Create new account</p>
        </Link>
      </div>
    </div>
  );
}
