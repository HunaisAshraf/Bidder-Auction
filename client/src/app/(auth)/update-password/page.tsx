"use client";

import UpdatePasswordForm from "@/components/userform/UpdatePasswordForm";
import { useSearchParams } from "next/navigation";
import React from "react";

export default function UpdatePassword() {
  const searchParams = useSearchParams();

  const email = searchParams.get("email");

  return (
    <div className="lg:mx-96 md:shadow-lg flex justify-center items-center min-h-[91vh]">
      <div>
        <UpdatePasswordForm email={email} />
      </div>
    </div>
  );
}
