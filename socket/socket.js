const { Server } = require("socket.io");
const authenticateSocket = require("../middlewares/socketAuthMiddleware");
const app = require("../app");

let io;
const initSocket = (server) => {
  console.log("initialize socket ");
  io = new Server(server);
  app.set("io", io);
  io.use(authenticateSocket);

  io.on("connection", (socket) => {
    console.log("A user connected:", socket.user.userId);
    socket.join(socket.user.userId);

    socket.on("join-mission-room", (roomName) => {
      console.log(`User joined roomName: ${roomName}`);
      socket.join(roomName);
    });

    socket.on("leave-mission-room", (roomName) => {
      console.log(`User left roomName: ${roomName}`);
      socket.leave(roomName);
    });

    socket.on("send-location", (location, roomName) => {
      console.log("location", location, roomName);
      socket.to(roomName).emit("receive-location", location);
    });

    socket.on("", (msg, roomName) => {
      socket.to(roomName).emit("chat message", msg);
    });

    socket.on("disconnect", () => {});
  });
};

module.exports = { initSocket, io };
