import { Message } from "../types/message";

export const fetchUsersAndMessages = async (
  setActiveUsers: React.Dispatch<React.SetStateAction<string[]>>,
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>
) => {
  try {
    const usersResponse = await fetch("http://localhost:3000/api/activeUsers");
    const usersData = await usersResponse.json();
    setActiveUsers(usersData);

    const messagesResponse = await fetch("http://localhost:3000/api/messages");
    const messagesData = await messagesResponse.json();
    setMessages(messagesData);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
