import React, { useEffect, useState } from "react";
import { mockMessages } from "../services/mockData";
import { Message } from "../types/message";
import { v4 as uuidv4 } from "uuid";
import { fetchUsersAndMessages } from "../services/fetchData";
import useSocket from "../hooks/useSocket";
import { Socket } from "socket.io-client";
import ChatMessages from "./chat-messages";
import ChatInput from "./chat-input";

interface ChatRoomProps {
  socket: Socket;
  username: string;
}

const ChatRoom: React.FC<ChatRoomProps> = ({ socket, username }) => {
  const [messageInput, setMessageInput] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [editMessageId, setEditMessageId] = useState<string | null>(null);
  const [activeUsers, setActiveUsers] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<string>("chat");

  useEffect(() => {
    fetchUsersAndMessages(setActiveUsers, setMessages).catch((error) => {
      console.error("Error fetching initial data:", error);
    });
  }, []);

  useSocket(socket, setMessages, setActiveUsers);

  const handleSubmitMessage = () => {
    if (socket && messageInput.trim()) {
      if (editMessageId) {
        socket.emit("editMessage", {
          messageId: editMessageId,
          updatedMessage: messageInput,
        });
        setEditMessageId(null);
        console.log(`Message to be edited: ${messageInput} by ${username}`);
      } else {
        socket.emit("message", {
          username,
          socketId: socket.id,
          message: messageInput,
          messageId: uuidv4(),
          date: new Date().toISOString(),
        });
        console.log(`Message sent: ${messageInput} by ${username}`);
      }
      setMessageInput("");
    }
  };

  const handleEditMessage = (messageId: string, message: string) => {
    setMessageInput(message);
    setEditMessageId(messageId);
  };

  const handleDeleteMessage = (messageId: string) => {
    if (socket) {
      console.log(`Message deleted: ${messageId}`);
      socket.emit("deleteMessage", { messageId });
    }
  };

  return (
    <div className="chat-container">
      <div className="px-4 py-4 text-center bg-gray-200 chat-header">
        Status Meetup Standup
      </div>
      <div className="flex flex-col flex-1 overflow-hidden">
        <div className="bg-gray-200">
          <div className="flex">
            <button
              className={`tab-button ${
                activeTab === "participants" && "bg-white"
              }`}
              onClick={() => setActiveTab("participants")}
            >
              Participants ({activeUsers.length})
            </button>
            <button
              className={`tab-button ${activeTab === "chat" && "bg-white"}`}
              onClick={() => setActiveTab("chat")}
            >
              Chat
            </button>
          </div>
        </div>
        {activeTab === "chat" ? (
          <>
            <ChatMessages
              messages={messages}
              username={username}
              handleEditMessage={handleEditMessage}
              handleDeleteMessage={handleDeleteMessage}
            />
             <ChatInput
              messageInput={messageInput}
              setMessageInput={setMessageInput}
              handleSubmitMessage={handleSubmitMessage}
              editMessageId={editMessageId}
            />
          </>
        ) : (
          <div className="participants-list">
            <ul>
              {activeUsers.map((user, index) => (
                <li key={index} className="p-3 mt-2 border-b border-gray-300">
                  {user}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatRoom;
