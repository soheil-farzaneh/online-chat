const express = require("express");
const { createServer } = require("http");
const cors = require("cors");

const PORT = 8080;
const corsOption = {
  origin: "http://192.168.58.191:3000",
};

const app = express();
const server = createServer(app);
const io = require("socket.io");

app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//state
const UsersState = {
  users: [],
  setUsers: (newUserArray) => {
    this.users = newUserArray;
  },
};

io.on("connection", (socket) => {
  socket.emit("ownId", socket.id);
  socket.broadcast.emit("recipientId", socket.id);
  socket.broadcast.emit("connectStatus", `user ${socket.id} is connected.`);

  //send a message to special user
  socket.on("send-private-message", (message) => {
    const objectMessage = JSON.parse(message);
    const { text, recipientId, senderId } = objectMessage;
    socket.emit("message", text);
    io.to(recipientId).emit("private-message", {
      recipientId: senderId,
      ownId: recipientId,
      text,
    });
  });

  // when user disconnects
  socket.on("disconnect", () => {
    socket.broadcast.emit(
      "connectStatus",
      `user ${socket.id} is disconnected!`
    );
  });

  // when user has activity
  socket.on("activity", () => {
    socket.broadcast.emit("activity", socket.id);
  });
});
server.on("err", (err) => {
  console.log("Error opening server");
});
server.listen(PORT, () => {
  console.log("server is runing");
});
