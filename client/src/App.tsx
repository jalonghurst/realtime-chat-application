import { useState } from "react";
import io, { Socket } from "socket.io-client";
import ChatRoom from "./components/chat-room";

function App() {
  const [username, setUsername] = useState<string>("");
  const [socket, setSocket] = useState<Socket | null>(null);

  // Function to handle joining chat and establishing socket connection
  // Trigger socket connection by setting username
  const handleJoinChat = () => {
    if (username.trim() === "") {
      console.log("Username is required");
      return;
    }
    // Establish socket connection to server port
    const newSocket = io("http://localhost:3000", {
      query: { username },
      transports: ["websocket"],
    });
    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full max-h-screen p-2 bg-gray-100 lg:p-8">
      {!socket ? (
        <div className="w-full max-w-xl p-6 bg-white rounded-lg shadow-md">
          <h1 className="mb-4 text-2xl font-bold">Join Chat</h1>
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 mb-4 border border-gray-300 rounded"
          />
          <button
            onClick={handleJoinChat}
            className="w-full p-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            Join
          </button>
        </div>
      ) : (
        <div className="flex flex-col w-full h-full p-2 bg-white rounded-lg shadow-md lg:p-6">
          <ChatRoom socket={socket} username={username} />
        </div>
      )}
    </div>
  );
}

export default App;
