import dotenv from "dotenv";
dotenv.config();

import { app } from "./app.js";
import connectDB from "./config/db.js";
import http from "http";
import { Server } from "socket.io";

import { VerifyUser } from "./mailControll/sendVerification.js";
// VerifyUser("himanshu1991patna@gmail.com")

// ✅ Step 1: Create HTTP server from app
const server = http.createServer(app);

// ✅ Step 2: Attach Socket.io
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // 👈 frontend ka origin
    methods: ["GET", "POST"], 
     credentials: true, 
  },
});

// ✅ Step 3: Socket events
io.on("connection", (socket) => {
  console.log("New user connected:", socket.id);

  // Jab koi room join kare
  socket.on("join-room", (roomId) => {
    socket.join(roomId);
    socket.to(roomId).emit("user-joined", socket.id);
  });

  // Offer bhejna
  socket.on("offer", (data) => {
    socket.to(data.roomId).emit("offer", data);
  });

  // Answer bhejna
  socket.on("answer", (data) => {
    socket.to(data.roomId).emit("answer", data);
  });

  // ICE Candidate bhejna
  socket.on("ice-candidate", (data) => {
    socket.to(data.roomId).emit("ice-candidate", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// ✅ Step 4: Connect DB and start server
connectDB()
  .then(() => {
    const PORT = process.env.PORT || 8000;
    server.listen(PORT, () => {
      console.log(`📡 Server started at PORT 🔐 ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Failed to connect to the database", err);
    process.exit(1);
  });
