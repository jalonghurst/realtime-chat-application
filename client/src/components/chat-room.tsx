import React from "react";
import { mockMessages } from "../services/mockData";
import { Message } from "../types/message";

const ChatRoom: React.FC = () => {
  // State to store inputted message
    const [messageInput, setMessageInput] = React.useState<string>("");
    const [messages, setMessages] = React.useState<Message[]>(mockMessages);

  return (
      <div>
          <div>
          {messages.map((msg) => (
            <div key={msg.messageId} className="flex flex-col mb-2 group">
              <div>
                <strong>{msg.username}</strong>
                <span className="ml-2 text-xs text-gray-500">
                  {msg.date.toString()}
                </span>
              </div>
              <p>{msg.message}</p>
            </div>
          ))}
          </div>
      <input
        type="text"
        value={messageInput}
        onChange={(e) => setMessageInput(e.target.value)}
        placeholder="Message"
      />
      <button onClick={() => console.log("send message")}>Send</button>
    </div>
  );
};

export default ChatRoom;
