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

      const handleDeleteMessage = ({messageId, isDeleted}: { messageId: string, isDeleted: boolean }) => {
        setMessages((prevMessages) =>
          prevMessages.map((msg) => msg.messageId !== messageId ? {...msg} : {...msg, isDeleted, message: ""})
        );
      };

      const handleEditMessage = ({
        messageId,
        updatedMessage,
        isEdited,
      }: {
        messageId: string;
          updatedMessage: string;
          isEdited: boolean;
      }) => {
        setMessages((prevMessages) =>
          prevMessages.map((msg) =>
            msg.messageId === messageId
              ? { ...msg, message: updatedMessage, isEdited }
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