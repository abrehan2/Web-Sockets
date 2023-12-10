const http = require("http"); // MUST FOR WEB SOCKETS
const express = require("express");
const app = express();
const path = require("path");
const server = http.createServer(app); // NOW YOU NEED TO CREATE A SERVER USING HTTP
const PORT = 9000;

// SOCKET.IO PARTIALS -
const { Server } = require("socket.io");
const io = new Server(server);
io.on("connection", (socket) => {
  // CLIENT NAY SERVER KO MESSAGE SEND KIYA, AB SERVER KI DUTY YE HAI KAY WO MESSAGE AB CLIENT KO SEND KERAY
  socket.on("user-message", (msg) => io.emit("message", msg));
});

// Use express.static TO SERVE STATIC FILES FROM THE "public" DIRECTORY -
app.use(express.static(path.join(__dirname, "public")));

// ROUTES -
app.get("/", (req, res) => {
  return res.sendFile(path.join(__dirname, "public", "index.html"));
});

// SERVER -
server.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
