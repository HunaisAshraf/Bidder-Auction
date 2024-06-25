"use client";

import { useAppSelector } from "@/lib/store/hooks";
import Image from "next/image";
import React, { useEffect } from "react";

export default function ChatComponent() {
  const chat = useAppSelector((state) => state.chats.selectedChat);
  useEffect(() => {
    console.log("selected", chat);
  }, [chat]);

  return (
    <div className="border-b-2">
      <div className="flex items-center gap-3 p-4">
        <Image
          src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
          alt="profile"
          width={50}
          height={50}
          className="rounded-full"
        />
        <h1 className="text-2xl">Name</h1>
      </div>
      <div className="p-4"></div>
    </div>
  );
}
