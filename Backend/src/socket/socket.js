import { v4 as uuidv4 } from "uuid";

// Global in-memory data
const waitingQueue = [];
const rooms = new Map();

export function initSocket(io) {
  io.on("connection", (socket) => {
    console.log("✅ Connected:", socket.id);

    // Find a partner
    socket.on("find-partner", () => {
      console.log("🎯 find-partner:", socket.id);

      if (waitingQueue.includes(socket.id)) return;

      if (waitingQueue.length > 0) {
        // Pair with waiting user
        const otherSocketId = waitingQueue.shift();
        const roomId = uuidv4();
        rooms.set(roomId, { a: otherSocketId, b: socket.id });

        socket.join(roomId);
        io.sockets.sockets.get(otherSocketId)?.join(roomId);

        // Notify both clients
        io.to(otherSocketId).emit("partner-found", { roomId, initiator: true });
        io.to(socket.id).emit("partner-found", { roomId, initiator: false });

        console.log("🤝 Paired:", otherSocketId, socket.id, "Room:", roomId);
      } else {
        waitingQueue.push(socket.id);
        socket.emit("waiting");
        console.log("🕒 Added to waitingQueue:", socket.id);
      }
    });

    // WebRTC Signalling
    socket.on("offer", ({ roomId, sdp }) => {
      console.log("📡 offer from", socket.id, "room", roomId);
      socket.to(roomId).emit("offer", { sdp });
    });

    socket.on("answer", ({ roomId, sdp }) => {
      console.log("📡 answer from", socket.id, "room", roomId);
      socket.to(roomId).emit("answer", { sdp });
    });

    socket.on("ice-candidate", ({ roomId, candidate }) => {
      socket.to(roomId).emit("ice-candidate", { candidate });
    });

    // Leave room
    socket.on("leave-room", ({ roomId }) => {
      console.log("🚪 leave-room", socket.id, "room", roomId);
      socket.leave(roomId);
      socket.to(roomId).emit("partner-left");
      rooms.delete(roomId);
    });

    // Handle disconnect
    socket.on("disconnect", () => {
      console.log("❌ Disconnected:", socket.id);

      const idx = waitingQueue.indexOf(socket.id);
      if (idx !== -1) waitingQueue.splice(idx, 1);

      for (const [roomId, pair] of rooms.entries()) {
        if (pair.a === socket.id || pair.b === socket.id) {
          socket.to(roomId).emit("partner-left");
          rooms.delete(roomId);
        }
      }
    });
  });
}
