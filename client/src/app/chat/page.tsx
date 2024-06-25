import ChatComponent from "@/components/ChatComponent";
import ChatListComponent from "@/components/ChatListComponent";
import axios from "axios";
import { cookies } from "next/headers";

async function getChat() {
  try {
    const token = cookies().get("token");
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_HOST}/api/chat/get-chat`,
      {
        headers: {
          Authorization: `Bearer ${token?.value}`,
        },
      }
    );
    console.log(data);
    return data.chat;
  } catch (error) {
    console.log(error);
  }
}

export default async function Chat() {
  const chats = await getChat();
  return (
    <div className="mx-12 md:mx-36 flex">
      <div className="w-1/4 min-h-screen shadow-lg p-4">
        <ChatListComponent chats={chats} />
      </div>
      <div className="w-3/4 min-h-screen shadow-lg">
        <ChatComponent />
      </div>
    </div>
  );
}
