"use client";

import { useRouter } from "next/navigation";
import useAuth from "./hooks/auth";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

console.log("sessionnnnn", status);export default function AuthHandler() {
  const router = useRouter();
  const { saveAuthData } = useAuth();
  const { data: session,status } = useSession();


  useEffect(() => {
    if (session) {
      const userData = {
        name: session?.user?.name,
        email: session?.user?.email,
        profilePicture: session?.user?.image,
      };
      saveAuthData(userData);
      router.push("/");
    }
  }, [session, saveAuthData]);

  return null;
}
