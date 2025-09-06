// src/Section/MatchRandomUser.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import socket from "../../Socket";

export default function MatchRandomUser() {
  const navigate = useNavigate();
  const [waiting, setWaiting] = useState(true);

  useEffect(() => {
    socket.emit("find-random", (res) => {
      if (res.waiting) {
        setWaiting(true);
      } else if (res.roomId) {
        navigate(`/call/${res.roomId}`);
      }
    });

    socket.on("room-ready", ({ roomId }) => {
      navigate(`/call/${roomId}`);
    });

    return () => {
      socket.off("room-ready");
    };
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
      {waiting ? (
        <h2 className="text-xl">⏳ Waiting for a random partner...</h2>
      ) : (
        <h2 className="text-xl">Connecting...</h2>
      )}
    </div>
  );
}
