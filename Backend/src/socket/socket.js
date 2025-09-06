import { nanoid } from "nanoid"; // for generating random room IDs
let waitingUser = null;

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("find-random", async (callback) => {
    if (waitingUser) {
      // Pair with the waiting user
      const roomId = nanoid(); // generate a random room ID
      socket.join(roomId);
      io.to(waitingUser).socketsJoin(roomId);

      // Notify both users
      io.to(roomId).emit("room-ready", { roomId });
      console.log(`Room ${roomId} created for ${socket.id} & ${waitingUser}`);

      // Clear waiting user
      waitingUser = null;

      // Return room URL to frontend
      callback({ roomId });
    } else {
      // No one waiting, put this user in queue
      waitingUser = socket.id;
      callback({ waiting: true });
    }
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
    console.log("User disconnected:", socket.id);
    if (waitingUser === socket.id) waitingUser = null;
  });
});
