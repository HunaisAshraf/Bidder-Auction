"use client";

import { axiosInstance } from "@/utils/constants";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function VerifyEmail() {
  const [verifying, setVerifying] = useState(true);
  const [timer, setTimer] = useState(5);
  const router = useRouter();

  async function verify() {
    try {
      const { data } = await axiosInstance.get("/api/auth/verify");

      if (data.success) {
        setVerifying(false);
        router.push("/login");
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    verify();
  }, []);

  return (
    <div className="min-h-[100vh] flex justify-center items-center">
      {verifying ? (
        <h1> Loading.....</h1>
      ) : (
        <h1> Redirecting in {timer} seconds...</h1>
      )}
    </div>
  );
}
