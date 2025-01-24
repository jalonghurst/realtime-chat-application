import React, { useEffect, useState } from "react";
import { mockMessages } from "../services/mockData";
import { Message } from "../types/message";
import {
  PencilIcon,
  TrashIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/solid";
import { v4 as uuidv4 } from "uuid";
import { fetchUsersAndMessages } from "../services/fetchData";
import { formatTime } from "../utils/formatTime";
import useSocket from "../hooks/useSocket";
import { Socket } from "socket.io-client";

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
          <div className="chat-messages">
            {messages.map((msg) => (
              <div key={msg.messageId} className={"flex flex-col mb-2 group"}>
                <div>
                  <strong>{msg.username}</strong>
                  <span className="ml-2 text-xs text-gray-500">
                    {formatTime(msg.date)}
                  </span>
                </div>
                <div className="flex-row items-center">
                  <p
                    className={msg.socketId === "system" ? "text-gray-500" : ""}
                  >
                    {msg.message}
                  </p>
                  {msg.username === username && (
                    <span className="message-icons">
                      <PencilIcon
                        className="w-3 h-3 ml-1 text-gray-400 cursor-pointer"
                        onClick={() =>
                          handleEditMessage(msg.messageId, msg.message)
                        }
                      />
                      <TrashIcon
                        className="w-3 h-3 ml-1 text-gray-400 cursor-pointer"
                        onClick={() => handleDeleteMessage(msg.messageId)}
                      />
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="participants-list">
            <ul>
              {activeUsers.map((user, index) => (
                <li key={index} className="mb-2">
                  {user}
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="chat-input">
          <input
            type="text"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            placeholder="Message"
            className="flex-grow p-2 border border-gray-300 rounded-l focus:border-gray-400 focus:outline-none"
          />
          <button
            onClick={handleSubmitMessage}
            className="p-2 text-white bg-blue-500 rounded-r hover:bg-blue-600"
          >
            {editMessageId ? (
              <PencilIcon className="w-5 h-5" />
            ) : (
              <PaperAirplaneIcon className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
