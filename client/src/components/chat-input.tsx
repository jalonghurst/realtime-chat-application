import React from "react";
import { PencilIcon, PaperAirplaneIcon } from "@heroicons/react/24/solid";

interface ChatInputProps {
  messageInput: string;
  setMessageInput: React.Dispatch<React.SetStateAction<string>>;
  handleSubmitMessage: () => void;
  editMessageId: string | null;
}

const ChatInput: React.FC<ChatInputProps> = ({
  messageInput,
  setMessageInput,
  handleSubmitMessage,
  editMessageId,
}) => {
  return (
    <div className="flex p-2 border-t border-gray-300 chat-input bg-gray-50">
      <input
        type="text"
        value={messageInput}
        onChange={(e) => setMessageInput(e.target.value)}
        placeholder="Message"
        className="flex-grow p-2 border border-gray-300 rounded-l focus:outline-none focus:border-transparent"
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
  );
};

export default ChatInput;