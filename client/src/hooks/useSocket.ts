import { useEffect } from 'react';
import { Message } from '../types/message';
import { Socket } from 'socket.io-client';

const useSocket = (
  socket: Socket,
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>,
  setActiveUsers: React.Dispatch<React.SetStateAction<string[]>>
) => {
  useEffect(() => {
    if (socket) {
      const handleMessage = (messageData: Message) => {
        setMessages((prevMessages) => [...prevMessages, messageData]);
      };

      const handleDeleteMessage = (messageId: string) => {
        setMessages((prevMessages) =>
          prevMessages.filter((msg) => msg.messageId !== messageId)
        );
      };

      const handleEditMessage = ({
        messageId,
        updatedMessage,
      }: {
        messageId: string;
        updatedMessage: string;
      }) => {
        setMessages((prevMessages) =>
          prevMessages.map((msg) =>
            msg.messageId === messageId
              ? { ...msg, message: updatedMessage }
              : msg
          )
        );
      };

      const handleActiveUsers = (users: string[]) => {
        setActiveUsers(users);
      };

      socket.on("message", handleMessage);
      socket.on("deleteMessage", handleDeleteMessage);
      socket.on("editMessage", handleEditMessage);
      socket.on("activeUsers", handleActiveUsers);

      return () => {
        socket.off("message", handleMessage);
        socket.off("deleteMessage", handleDeleteMessage);
        socket.off("editMessage", handleEditMessage);
        socket.off("activeUsers", handleActiveUsers);
      };
    }
  }, [socket, setMessages, setActiveUsers]);
};

export default useSocket;