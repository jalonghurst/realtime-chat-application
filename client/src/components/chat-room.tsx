import React from "react";

const ChatRoom: React.FC = () => {
  // State to store inputted message
  const [messageInput, setMessageInput] = React.useState<string>("");

  return (
    <div>
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
