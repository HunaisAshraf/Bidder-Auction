"use client";

import { useAppSelector } from "@/lib/store/hooks";
import { axiosInstance } from "@/utils/constants";
import Image from "next/image";
import React, { FormEvent, use, useEffect, useRef, useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import moment from "moment";
import { useSocket } from "@/utils/hooks/useSocket";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

type Message = {
  _id: string;
  chatId: string;
  sender: string;
  message: string;
  createdAt: string;
};

export default function ChatComponent() {
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  const chat = useAppSelector((state) => state.chats.selectedChat);
  const selectedUser = useAppSelector((state) => state.chats.user);
  const user = useAppSelector((state) => state.users.user);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { socket } = useSocket();

  const sendMessage = async (e: FormEvent) => {
    try {
      e.preventDefault();
      const { data } = await axiosInstance.post(
        `/api/chat/add-message/${chat}`,
        { message: newMessage }
      );
      if (data.success) {
        // setMessages((prev) => [...prev, data.newMessage]);
        setNewMessage("");
        // console.log(messages);
        socket?.emit("send_message", { newMessage, chat });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getMessages = async () => {
      try {
        const { data } = await axiosInstance.get(
          `/api/chat/get-messages/${chat}`
        );
        if (data.success) {
          setMessages(data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (chat) {
      getMessages();
    }
  }, [chat]);

  useEffect(() => {
    socket?.emit("join_chat", chat);
    return () => {
      socket?.emit("leave_chat", chat);
    };
  }, [socket, chat]);

  useEffect(() => {
    socket?.on("receive_message", (data) => {
      setMessages((prev) => [...prev, data]);
    });
    return () => {
      socket?.off("receive_message");
    };
  }, [socket]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (!chat) {
    return (
      <div className="flex justify-center items-center min-h-[85vh]">
        <p>Please Select A Chat</p>
      </div>
    );
  }

  return (
    <div>
      <div className="border-b-2">
        {selectedUser && (
          <div className="flex items-center gap-3 px-4 p-4">
            {selectedUser.profilePicture ? (
              <Image
                src={selectedUser.profilePicture!}
                alt={selectedUser.name}
                width={50}
                height={50}
                className="rounded-full"
              />
            ) : (
              <AccountCircleIcon sx={{ fontSize: 50 }} />
            )}
            <h1 className="text-2xl font-semibold">{selectedUser.name}</h1>
          </div>
        )}
      </div>
      <div className="min-h-[70vh] max-h-[70vh] flex flex-col overflow-y-scroll px-5">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`border px-3 py-1 max-w-96 m-1  ${
              message.sender === user?.id
                ? "self-start bg-[#231656] text-white rounded-e-xl rounded-tl-xl"
                : "self-end bg-[#0f3b04] text-white rounded-s-xl rounded-tr-xl"
            }`}
          >
            <p className="whitespace-pre-wrap break-words mb-2">
              {message.message}
            </p>
            <p className="text-xs text-slate-400 ">
              {moment(message.createdAt).format("lll")}
            </p>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form className="flex  mt-2 items-center" onSubmit={sendMessage}>
        <input
          type="text"
          placeholder="send message"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="outline-none border-2 p-2 w-full"
        />
        <button className="text-white bg-[#231656] p-2 rounded">
          <SendIcon />
        </button>
      </form>
    </div>
  );
}
