const express = require("express");
const { createServer } = require("node:http");
const { join } = require("node:path");
const { Server } = require("socket.io");

const PORT = process.env.PORT ?? 8000;

const app = express();
const server = createServer(app);
const io = new Server(server);

app.get("/", (_, res) => {
  res.sendFile(join(__dirname, "public/index.html"));
});

io.on("connection", (socket) => {
  console.log(`A new user has connected`);
  socket.on("chat-message", (message) => {
    io.emit("chat-message", message);
  });
  socket.on("disconnect", () => {
    console.log(`User has disconnected`);
  });
});

server.listen(PORT, () => {
  console.log(`server started on PORT:${PORT}`);
});
