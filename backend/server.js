require("dotenv").config(); // 🔥 Load .env file
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const connectDB = require("./config/db"); // 🔥 Import connectDB function
const app = require("./app");

// Connect to MongoDB
connectDB();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

// Make WebSocket accessible in controllers
app.set("io", io);

// Handle WebSocket connections
require("./services/socket")(io);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
