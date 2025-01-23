import {Message} from "../types/message";

// Test data, delete once I have db setup
export const mockMessages: Message[] = [
    {
      username: "Michel Sagen",
      socketId: "15:21",
      message:
      "Waiting for a few more before we begin, I’m keeping my microphone muted for now",
    messageId: "1",
      date: new Date('2025-03-21T09:12:00.816Z')
    },
    { username: "Meetingbot", socketId: "15:22", message: "Peng Mok joined.",   messageId: "2", date: new Date('2025-03-21T21:13:00.816Z')},
    {
      username: "Meetingbot",
      socketId: "15:23",
      message: "Lars Bergendahl joined.",
      messageId: "3",
        date: new Date('2025-03-21T09:14:00.816Z')
    },
    {
      username: "Lars Bergendahl",
      socketId: "15:24",
      message:
        "When did we get chat? Is the backend ready to handle the massive amount of traffic we will get  ?",
      messageId: "4",
        date: new Date('2025-03-21T09:15:00.816Z')
    },
    {
      username: "Tom Erik Lia",
      socketId: "15:24",
      message: "Looks like I have another meeting, please email notes to me.",
      messageId: "5",
        date: new Date('2025-03-21T09:16:00.816Z')
    },
    { username: "Meetingbot", socketId: "15:24", message: "Tom Erik Lia left.",   messageId: "6",   date: new Date('2025-03-21T21:17:00.816Z') },
    {
      username: "Krzysztof Grzeslo",
      socketId: "15:25",
      message:
        "Will ask Thomas to restart sleipnir chat on osl-mid3. Thomas has a plan to migrate to chat websockets: www.websocketsforbeginners.com",
      messageId: "7",
        date: new Date('2025-03-21T09:18:00.816Z')
    },
    {
      username: "Michel Sagen",
      socketId: "15:25",
      message:
        "Not sure about websockets. Chat already has a name- strongly suggest we do not change the name weeks before it is launched. Should we launch on desktop first?",
      messageId: "8",
        date: new Date('2025-03-21T21:18:00.816Z')
    },
  ];
