import React, { useEffect, useState } from "react";
import { mockMessages } from "../services/mockData";
import { Message } from "../types/message";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
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
      <div className="px-4 py-4 text-center bg-gray-100 border-b border-gray-300 chat-header">
        Status Meetup Standup
      </div>
      <div className="flex flex-col flex-1 overflow-hidden">
        <div className="px-4 py-4 bg-gray-100 border-b border-gray-300">
          Participants({activeUsers.length}): {activeUsers.join(", ")}
        </div>
        <div className="flex-1 p-4 overflow-y-auto bg-white chat-messages">
          {messages.map((msg) => (
            <div key={msg.messageId} className="flex flex-col mb-2 group">
              <div>
                <strong>{msg.username}</strong>
                <span className="ml-2 text-xs text-gray-500">
                  {formatTime(msg.date)}
                </span>
              </div>
              <div className="flex flex-row items-center">
              <p>{msg.message}</p>
              {msg.username === username && (
                <span className="flex flex-row items-center text-xs transition-opacity duration-200 opacity-0 group-hover:opacity-100">
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

        <div className="flex p-2 border-t border-gray-300 chat-input">
          <input
            type="text"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            placeholder="Message"
            className="flex-grow p-2 border border-gray-300 rounded-lg"
          />
          <button
            onClick={handleSubmitMessage}
            className="p-2 text-white bg-blue-500 rounded-r hover:bg-blue-600"
          >
            {editMessageId ? "Edit" : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
