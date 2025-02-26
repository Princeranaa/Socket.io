const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const path = require("path");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(cors());

app.use(express.static(path.join(__dirname, "public")))



const db = require('./config/database')
db.connectToDb()


io.on("connection", (socket) => {
  console.log(`✅ User connected: ${socket.id}`);

  // Listen for incoming messages
  socket.on("message", (data) => {
    console.log(`📩 Received message from ${socket.id}:`, data);

    // If you want to send to ALL clients including the sender, use:
    io.emit("message", data);
  });

  socket.on("disconnect", () => {
    console.log(`❌ User disconnected: ${socket.id}`);
  });
});

server.listen(3000, () => {
  console.log("🚀 Server running on http://localhost:3000");
});
