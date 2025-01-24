Real-time Chat Application

A chat app built with React, Vite, Tailwind CSS, Express, and Socket.io. Users have the ability to join the chat by submitting their name, then they can send, edit or delete their own messages. User can also view the chat history, and a list of active users.

![Chat Application Demo](https://github.com/jalonghurst/realtime-chat-application/blob/main/client/public/websocket-app.gif)


## Technologies Used

- **Frontend**: React, Vite, Tailwind CSS
- **Backend**: Express, Socket.io, Mongoose
- **Database**: MongoDB

## Getting Started

### 1. Clone the Repository

```sh
git clone https://github.com/jalonghurst/realtime-chat-application.git
cd realtime-chat-application
```
### 2. Set Up the Server
Navigate to the server directory:
```sh
cd server
npm install
```
Create a .env file in the server directory and add the following environment variable:
```
MONGODB_URI=mongodb+srv://jacquilonghurst:X6itmBA6qE6OJuRa@cluster1.jkbif.mongodb.net/chatroom?retryWrites=true&w=majority&ssl=true
```
Start the server:
```
npm start
```

### 3. Set Up the Client
Navigate to the client directory:
```
cd ../client
```
Install the client dependencies, and start the client development server:
```
npm install
npm start
```

Time spent: Aproximately seven hours in total. 

### What needs improvement:
- Improve user experience by automatically scrolling to bottom of the messages container on page load, so that latest messages are seen first, and being able to submit messages with the enter key.
- Performance improvements such as virtual scrolling, efficently handling large amounts of data by only rendering messages visible in the viewport, using libraries such as react-window.
- Spending more time on error handling, ensuring that each participant on the chat is always removed properly when disconnecting.
- Improve code quality and readability more by refactoring code and moving into seperate components, and removing any redunant tailwind classes.
