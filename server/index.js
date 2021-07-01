const { log } = require("console");
const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const server = http.createServer(app);
const router = require('./routes')
const socketio = require("socket.io");
const { addUser, getUser, removeUser, getUsersInRoom } = require("./users");

const io = socketio(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(cors);

app.use(router)
const PORT = process.env.PORT || 5500;
io.on("connection", (socket) => {
  console.log("New connection");

  socket.on("joinRoom", ({ name, room }) => {
    const user = addUser(socket.id, name, room);

    socket.emit("message", { user: "admin", text: "Welcome to the chat" });

    socket.broadcast.to(user.room).emit("message", {
      user: "admin",
      text: `${user.name} has joined the chat`,
    });

    io.emit("usersInRoom", {
      room: user.room,
      users: getUsersInRoom(user.room),
    });
    socket.join(user.room);
  });

  socket.on("sendMessage", ({ message, name }) => {
    const user = getUser(name);

    io.to(user.room).emit("message", { user: user.name, text: message });
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);

    if (user) {
      io.emit("message", {
        user: "admin",
        text: `${user.name} has left the chat`,
      });
    }

    io.emit("usersInRoom", {
      room: user.room,
      users: getUsersInRoom(user.room),
    });
  });
});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
