"use client";

import { signIn, useSession } from "next-auth/react";
import React, { useEffect } from "react";
import GoogleIcon from "@mui/icons-material/Google";
import { axiosInstance } from "@/utils/constants";
import { useRouter } from "next/navigation";

export default function GoogleSigninButton() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleGoogleLogin = async () => {
    try {
      await signIn("google");
    } catch (error) {
      console.log(error);
    }
  };

  const saveUserData = async () => {
    try {
      const userData = {
        name: session?.user?.name,
        email: session?.user?.email,
        profilePicture: session?.user?.image,
      };

      const { data } = await axiosInstance.post(
        "/api/auth/google-signup",
        userData
      );

      if (data?.success) {
        const user = {
          id: data.user.googleId,
          name: data.user.name,
          email: data.user.email,
          phone: data.user.phone,
          profilePicture: data.user.profilePicture,
        };

        localStorage.setItem("auth", JSON.stringify(user));
        localStorage.setItem("token", data.token);
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      saveUserData();
    }
  }, [status, session, router]);

  return (
    <div className="flex justify-center items-center gap-3">
      <button
        onClick={handleGoogleLogin}
        className="flex items-center gap-2 border-2 rounded-md p-2"
      >
        <GoogleIcon /> Google
      </button>
    </div>
  );
}
