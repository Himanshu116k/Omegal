import dotenv from "dotenv";
dotenv.config();

import { app } from "./app.js";
import connectDB from "./config/db.js";
import http from "http";
import { Server } from "socket.io";
import { nanoid } from "nanoid";  // 👈 for generating unique room IDs

import { VerifyUser } from "./mailControll/sendVerification.js";
// VerifyUser("himanshu1991patna@gmail.com")

// ✅ Step 1: Create HTTP server from app
const server = http.createServer(app);

// ✅ Step 2: Attach Socket.io
const io = new Server(server, {
  cors: {
    origin: process.env.CORS_ORIGIN, // 👈 frontend ka origin
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// 🟢 Queue for waiting user
let waitingUser = null;

// ✅ Step 3: Socket events
io.on("connection", (socket) => {
  console.log("New user connected:", socket.id);

  // -------------------------------------
  // RANDOM MATCHING LOGIC
  // -------------------------------------
  socket.on("find-random", (callback) => {
    if (waitingUser) {
      // Pair current socket with waiting user
      const roomId = nanoid();
      socket.join(roomId);
      io.sockets.sockets.get(waitingUser)?.join(roomId);

      io.to(roomId).emit("room-ready", { roomId });
      console.log(`Room ${roomId} created for ${socket.id} & ${waitingUser}`);

      waitingUser = null;
      callback({ roomId });
    } else {
      // No one waiting → keep this socket in queue
      waitingUser = socket.id;
      callback({ waiting: true });
    }
  });

  // -------------------------------------
  // ROOM-BASED LOGIC (your existing code)
  // -------------------------------------
  socket.on("join-room", (roomId) => {
    socket.join(roomId);
    socket.to(roomId).emit("user-joined", socket.id);
  });

  socket.on("offer", (data) => {
    socket.to(data.roomId).emit("offer", data);
  });

  socket.on("answer", (data) => {
    socket.to(data.roomId).emit("answer", data);
  });

  socket.on("ice-candidate", (data) => {
    socket.to(data.roomId).emit("ice-candidate", data);
  });

  socket.on("disconnect", () => {
    if (waitingUser === socket.id) {
      waitingUser = null; // clear queue if the waiting user leaves
    }
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
