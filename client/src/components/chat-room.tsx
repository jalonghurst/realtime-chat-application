import React, { useEffect } from "react";
import { mockMessages } from "../services/mockData";
import { Message } from "../types/message";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";

interface ChatRoomProps {
  socket: any;
  username: string;
}

const ChatRoom: React.FC<ChatRoomProps> = ({ socket, username }) => {
  // State to store inputted message
  const [messageInput, setMessageInput] = React.useState<string>("");
  // React state to store messages
  const [messages, setMessages] = React.useState<Message[]>(mockMessages);

  useEffect(() => {
    // Listen for message event from server
    if (socket) {
      socket.on("message", (message: Message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });
      return () => {
        socket.off("message");
      };
    }
  }, [socket]);

  const handleSubmitMessage = () => {
    // Return if message input is empty and
    if (!socket && messageInput.trim() === "") {
      console.log("Message is required");
      return;
    }
    // Emit message creation event to server
    socket.emit("message", {
      username: username,
      socketId: socket.id,
      message: messageInput,
      messageId: Math.random().toString(),
      date: new Date(),
    });
    console.log("Message sent");
    setMessageInput("");
  };

  return (
    <div className="flex flex-col h-full w-full overflow-hidden">
      <div className="">Status Meetup Standup</div>
      <div className="flex flex-col flex-1 overflow-hidden">
        <div> Participants(8)</div>
        <div className="flex-1 p-4 overflow-y-auto bg-white overflow-y-auto">
          {messages.map((msg) => (
            <div key={msg.messageId} className="flex flex-col mb-2 group">
              <div>
                <strong>{msg.username}</strong>
                <span className="ml-2 text-xs text-gray-500">
                  {msg.date.toString()}
                </span>
              </div>
              <p>{msg.message}</p>
              {msg.username === username && (
                <span className="flex flex-row items-center text-xs transition-opacity duration-200 opacity=0 group-hover:opacity-100">
                  <PencilIcon className="w-3 h-3 ml-1 text-gray-400 cursor-pointer" />
                  <TrashIcon className="w-3 h-3 ml-1 text-gray-400 cursor-pointer" />
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="flex p-2 border-t border-gray-300 flex-shrink-0 bordert-t-1 bg-white">
        <input
          type="text"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          placeholder="Message"
          className="flex-grow p-2 border border-gray-300 rounded-l"
        />
        <button
          onClick={() => handleSubmitMessage()}
          className="p-2 text-white bg-blue-500 rounded-l hover:bg-gray-200"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatRoom;
