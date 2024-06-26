"use client";

import { useAppSelector } from "@/lib/store/hooks";
import { axiosInstance } from "@/utils/constants";
import Image from "next/image";
import React, { FormEvent, use, useEffect, useRef, useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import moment from "moment";
import { useSocket } from "@/utils/hooks/useSocket";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import VideocamIcon from "@mui/icons-material/Videocam";
import Peer from "peerjs";
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

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
  const [call, setCall] = useState();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const chat = useAppSelector((state) => state.chats.selectedChat);
  const selectedUser = useAppSelector((state) => state.chats.user);
  const user = useAppSelector((state) => state.users.user);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const router = useRouter();

  const { socket, me, createRoom } = useSocket();

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

  const joinCall = () => {
    try {
      socket?.emit("join_call", { selectedUser: selectedUser?._id });
      router.push(`/chat/${chat}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRejectCall = () => {
    try {
      socket?.emit("call_rejected", chat);
      handleClose();
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

    socket?.on("incoming_call", (invitedUser) => {
      if (invitedUser.selectedUser === user?._id) {
        // setCall()
        handleOpen();
      }
    });

    // socket?.on("user-joined", (room, joinedUser) => {
    //   console.log("room", room, " joinded ", joinedUser);
    // });

    return () => {
      socket?.off("receive_message");
    };
  }, [socket]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // useEffect(() => {
  //   const peerId = new Peer(user?._id!);
  //   console.log("aksjdfhkasddfk", peerId);

  //   setMe(peerId);
  // }, []);

  if (!chat) {
    return (
      <div className="flex justify-center items-center min-h-[85vh]">
        <p>Please Select A Chat</p>
      </div>
    );
  }

  return (
    <div>
      <div>
        {/* <Button onClick={handleOpen}>Open modal</Button> */}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <p className="text-2xl font-semibold text-center mb-6">
              Incomming Call
            </p>
            <div className="text-center">
              <button
                onClick={() => router.push(`/chat/${chat}`)}
                className="p-2 mx-3 bg-[#231656] text-white font-semibold"
              >
                Accept
              </button>
              <button
                onClick={handleRejectCall}
                className="p-2 mx-3 bg-red-800 text-white font-semibold"
              >
                Decline
              </button>
            </div>
          </Box>
        </Modal>
      </div>
      <div className="border-b-2">
        {selectedUser && (
          <div className="flex items-center justify-between gap-3 px-4 p-4">
            <div className="flex items-center gap-2">
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
            <div>
              <button onClick={joinCall}>
                <VideocamIcon className="text-5xl text-[#231656]" />
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="min-h-[70vh] max-h-[70vh] flex flex-col overflow-y-scroll px-5">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`border px-3 py-1 max-w-96 m-1  ${
              message.sender === user?._id
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
