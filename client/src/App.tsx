import "./App.css";
import ChatRoom from "./components/chat-room";

function App() {
  return (
    <div className="flex flex-col items-center justfy-center w-full h-full max-h-screen p-2 bg-gray-100 lg:p-8">
      <div className="flex flex-col w-full h-full p-2 bg-white rounded-lg shadow-md lg:p-6">
        <ChatRoom />
        </div>
    </div>
  );
}

export default App;
