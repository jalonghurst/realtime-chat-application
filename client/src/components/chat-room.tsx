import React from "react";

interface Message {
    username: string;
    socketId: string;
    message: string;
    messageId: string;
    date: Date;
}



const ChatRoom: React.FC = () => {
  // State to store inputted message
    const [messageInput, setMessageInput] = React.useState<string>("");
    const [messages, setMessages] = React.useState<Message[]>([{username: "User", socketId: "1224", message: "Hi there", messageId: "29882395", date: new Date()}]);

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
