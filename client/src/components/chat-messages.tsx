import React from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Message } from "../types/message";
import { formatTime } from "../utils/formatTime";

interface ChatMessagesProps {
  messages: Message[];
  username: string;
  handleEditMessage: (messageId: string, message: string) => void;
  handleDeleteMessage: (messageId: string) => void;
}

const ChatMessages: React.FC<ChatMessagesProps> = ({
  messages,
  username,
  handleEditMessage,
  handleDeleteMessage,
}) => {
  return (
    <div className="chat-messages">
      {messages.map((msg) => (
        <div key={msg.messageId} className={"flex flex-col mb-2 group"}>
          <div>
            <strong>{msg.username}</strong>
            <span className="ml-2 text-xs text-gray-500">
              {formatTime(msg.date)}
            </span>
          </div>
          <div className="flex flex-row items-center">
            <p className={msg.socketId === "system" ? "text-gray-500" : ""}>
              {msg.message}
            </p>
            {msg.username === username && (
              <span className="message-icons">
                <PencilIcon
                  className="w-3 h-3 ml-1 text-gray-400 cursor-pointer"
                  onClick={() => handleEditMessage(msg.messageId, msg.message)}
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
  );
};

export default ChatMessages;