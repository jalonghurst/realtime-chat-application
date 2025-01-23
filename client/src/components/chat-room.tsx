import React from "react";
import { mockMessages } from "../services/mockData";
import { Message } from "../types/message";

interface ChatRoomProps {
    // Will need this for broadcasting messages
     socket: any;
}
   
const ChatRoom: React.FC<ChatRoomProps> = ({socket}) => {
  // State to store inputted message
  const [messageInput, setMessageInput] = React.useState<string>("");
  // React state to store messages
  const [messages, setMessages] = React.useState<Message[]>(mockMessages);

    const handleSubmitMessage = () => {
        // Return if message input is empty and 
        if (!socket && messageInput.trim() === "") {
            console.log("Message is required");
            return;
        }
        // Emit message creation event to server
        socket.emit("message", {
            username: "Test User",
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
