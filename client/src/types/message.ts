export interface Message {
    username: string;
    socketId: string;
    message: string;
    messageId: string;
    isEdited: boolean;
    isDeleted: boolean;
    date: string;
}